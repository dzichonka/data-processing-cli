import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { flagsParser } from "../utils/flagsParser.js";
import { pathResolver } from "../utils/pathResolver.js";

export async function calculateHash(filePath, algorithm) {
  const hash = crypto.createHash(algorithm);
  const stream = fs.createReadStream(filePath);

  for await (const chunk of stream) {
    hash.update(chunk);
  }

  return hash.digest("hex");
}

export async function hash(currentDir, args) {
  const { input, algorithm = "sha256", save } = flagsParser(args);

  const supported = ["sha256", "md5", "sha512"];

  if (!supported.includes(algorithm)) {
    throw new Error("Operation failed");
  }

  const inputPath = pathResolver(currentDir, [input]);
  console.log(inputPath);

  try {
    const digest = await calculateHash(inputPath, algorithm);
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
