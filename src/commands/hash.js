import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import streamPromises from "node:stream/promises";
import { flagsParser } from "../utils/flagsParser.js";
import { pathResolver } from "../utils/pathResolver.js";

export async function hash(currentDir, args) {
  const { input, algorithm = "sha256", save } = flagsParser(args);

  const supported = ["sha256", "md5", "sha512"];

  if (!supported.includes(algorithm)) {
    throw new Error("Operation failed");
  }

  const inputPath = pathResolver(currentDir, [input]);
  console.log(inputPath);

  try {
    const readStream = fs.createReadStream(inputPath);
    const hash = crypto.createHash(algorithm);

    await streamPromises.pipeline(readStream, hash);

    const digest = hash.digest("hex");

    console.log(`${algorithm}: ${digest}`);

    if (save) {
      const { dir, name } = path.parse(inputPath);
      const outputPath = path.join(dir, `${name}.${algorithm}`);

      await fsPromises.writeFile(outputPath, digest);
    }

    return currentDir;
  } catch {
    throw new Error("Operation failed");
  }
}
