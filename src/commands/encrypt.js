import fs from "node:fs";
import crypto from "node:crypto";
import streamPromises from "node:stream/promises";
import { flagsParser } from "../utils/flagsParser.js";
import { pathResolver } from "../utils/pathResolver.js";

export async function encrypt(currentDir, args) {
  const { input, output, password } = flagsParser(args);

  const inputPath = pathResolver(currentDir, [input]);
  const outputPath = pathResolver(currentDir, [output]);

  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);

  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);

  const key = crypto.scryptSync(password, salt, 32);

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  try {
    writeStream.write(salt);
    writeStream.write(iv);

    await streamPromises.pipeline(readStream, cipher, writeStream);

    const tag = cipher.getAuthTag();
    fs.appendFileSync(outputPath, tag);

    return currentDir;
  } catch {
    throw new Error("Operation failed");
  }
}
