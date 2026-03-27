import fs from "node:fs";
import crypto from "node:crypto";
import streamPromises from "node:stream/promises";
import fsPromises from "node:fs/promises";
import { flagsParser } from "../utils/flagsParser.js";
import { pathResolver } from "../utils/pathResolver.js";

export async function decrypt(currentDir, args) {
  const { input, output, password } = flagsParser(args);

  const inputPath = pathResolver(currentDir, [input]);
  const outputPath = pathResolver(currentDir, [output]);

  const stat = await fsPromises.stat(inputPath);

  const fd = await fsPromises.open(inputPath, "r");

  const salt = Buffer.alloc(16);
  const iv = Buffer.alloc(12);
  const authTag = Buffer.alloc(16);

  await fd.read(salt, 0, 16, 0);
  await fd.read(iv, 0, 12, 16);
  await fd.read(authTag, 0, 16, stat.size - 16);

  await fd.close();

  const key = crypto.scryptSync(password, salt, 32);

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);

  decipher.setAuthTag(authTag);

  const readStream = fs.createReadStream(inputPath, {
    start: 28,
    end: stat.size - 17,
  });

  const writeStream = fs.createWriteStream(outputPath);

  await streamPromises.pipeline(readStream, decipher, writeStream);

  return currentDir;
}
