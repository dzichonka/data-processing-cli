import fs from "node:fs";
import { flagsParser } from "../utils/flagsParser.js";
import { pathResolver } from "../utils/pathResolver.js";
import { logFailedOperation } from "../utils/logs.js";

export async function jsonToCsv(currentDir, args) {
  const { input, output } = flagsParser(args);

  const inputPath = pathResolver(currentDir, [input]);
  const outputPath = pathResolver(currentDir, [output]);

  const readStream = fs.createReadStream(inputPath, { encoding: "utf8" });
  const writeStream = fs.createWriteStream(outputPath);

  let jsonBuffer = "";
  for await (const chunk of readStream) {
    jsonBuffer += chunk;
  }

  const data = JSON.parse(jsonBuffer);

  if (!Array.isArray(data)) {
    logFailedOperation();
  }

  if (data.length === 0) {
    writeStream.end("");
    return currentDir;
  }

  const headers = Object.keys(data[0]);

  writeStream.write(headers.join(",") + "\n");

  for (const row of data) {
    const values = headers.map((h) => row[h] ?? "");
    writeStream.write(values.join(",") + "\n");
  }

  writeStream.end();

  return currentDir;
}
