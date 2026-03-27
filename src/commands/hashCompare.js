import fsPromises from "node:fs/promises";
import { flagsParser } from "../utils/flagsParser.js";
import { pathResolver } from "../utils/pathResolver.js";
import { calculateHash } from "./hash.js";
import { logFailedOperation } from "../utils/logs.js";
import { color } from "../utils/color.js";

export async function hashCompare(currentDir, args) {
  const { input, hash, algorithm = "sha256" } = flagsParser(args);

  const supported = ["sha256", "md5", "sha512"];

  if (!supported.includes(algorithm)) {
    logFailedOperation();
  }

  const inputPath = pathResolver(currentDir, [input]);
  const hashPath = pathResolver(currentDir, [hash]);

  const digest = await calculateHash(inputPath, algorithm);
  const expected = (await fsPromises.readFile(hashPath, "utf8")).trim();

  console.log(
    digest.toLowerCase() === expected.toLowerCase()
      ? `${color(33, "OK")}`
      : `${color(33, "MISMATCH")}`,
  );

  return currentDir;
}
