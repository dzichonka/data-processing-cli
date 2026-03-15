import fs from "node:fs";
import { flagsParser } from "../utils/flagsParser.js";
import { pathResolver } from "../utils/pathResolver.js";

export async function count(currentDir, args) {
  const { input } = flagsParser(args);

  const inputPath = pathResolver(currentDir, [input]);

  try {
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

    console.log(`Lines: ${lines}`);
    console.log(`Words: ${words}`);
    console.log(`Characters: ${characters}`);

    return currentDir;
  } catch {
    throw new Error("Operation failed");
  }
}
