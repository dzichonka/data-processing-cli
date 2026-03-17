import fs from "node:fs";
import { flagsParser } from "../utils/flagsParser.js";
import { pathResolver } from "../utils/pathResolver.js";
import { color } from "../utils/color.js";

export async function count(currentDir, args) {
  const { input } = flagsParser(args);

  const inputPath = pathResolver(currentDir, [input]);

  const readStream = fs.createReadStream(inputPath, { encoding: "utf8" });

  let lines = 0;
  let words = 0;
  let characters = 0;

  let rest = "";

  for await (const chunk of readStream) {
    characters += chunk.length;

    const data = rest + chunk;
    const parts = data.split(/\s+/);

    rest = parts.pop();

    words += parts.filter(Boolean).length;

    const lineParts = data.split(/\n/);
    lines += lineParts.length - 1;
  }

  if (rest.trim()) {
    words++;
  }
  console.log(`${color(36, "Lines:")} ${color(33, lines)}`);
  console.log(`${color(36, "Words:")} ${color(33, words)}`);
  console.log(`${color(36, "Characters:")} ${color(33, characters)}`);

  return currentDir;
}
