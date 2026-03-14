import fs from "node:fs";
import stream from "node:stream";
import streamPromises from "node:stream/promises";
import { flagsParser } from "../utils/flagsParser.js";
import { pathResolver } from "../utils/pathResolver.js";

export async function csvToJson(currentDir, args) {
  const { input, output } = flagsParser(args);
  console.log("csvToJson.js", input, output);

  const inputPath = pathResolver(currentDir, [input]);
  const outputPath = pathResolver(currentDir, [output]);

  console.log(inputPath, outputPath);

  const readStream = fs.createReadStream(inputPath, { encoding: "utf-8" });
  const writeStream = fs.createWriteStream(outputPath);

  let headers = [];
  let rest = "";

  const csvParser = new stream.Transform({
    readableObjectMode: true,

    transform(chunk, encoding, callback) {
      const data = rest + chunk;
      const lines = data.split("\n");

      rest = lines.pop();

      for (const line of lines) {
        if (!line.trim()) continue;

        if (headers.length === 0) {
          headers = line.split(",");
          continue;
        }

        const values = line.split(",");
        const obj = {};

        headers.forEach((h, i) => {
          obj[h] = values[i];
        });

        this.push(obj);
      }

      callback();
    },

    flush(callback) {
      if (rest) {
        const values = rest.split(",");
        const obj = {};

        headers.forEach((h, i) => {
          obj[h] = values[i];
        });

        this.push(obj);
      }

      callback();
    },
  });

  let isFirst = true;

  const jsonFormatter = new stream.Transform({
    writableObjectMode: true,

    transform(obj, encoding, callback) {
      let chunk;

      if (isFirst) {
        chunk = "[\n" + JSON.stringify(obj, null, 2);
        isFirst = false;
      } else {
        chunk = ",\n" + JSON.stringify(obj, null, 2);
      }

      this.push(chunk);
      callback();
    },

    flush(callback) {
      if (!isFirst) {
        this.push("\n]");
      } else {
        this.push("[]");
      }

      callback();
    },
  });

  await streamPromises.pipeline(
    readStream,
    csvParser,
    jsonFormatter,
    writeStream,
  );
  return currentDir;
}
