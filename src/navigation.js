import fs from "node:fs/promises";
import path from "node:path";
import { pathResolver } from "./utils/pathResolver.js";

export async function ls(currentDir) {
  const entries = await fs.readdir(currentDir, {
    withFileTypes: true,
  });

  const folders = [];
  const files = [];

  let maxLength = 0;

  for (const entry of entries) {
    if (entry.name.length > maxLength) maxLength = entry.name.length;
    if (entry.isDirectory()) folders.push(entry.name);
    else files.push(entry.name);
  }

  folders.sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
  files.sort();

  for (const f of folders)
    console.log(
      `\x1b[36m${f}\x1b[0m${" ".repeat(maxLength - f.length)}   \x1b[33m[folder]\x1b[0m`,
    );
  for (const f of files)
    console.log(
      `\x1b[36m${f}\x1b[0m${" ".repeat(maxLength - f.length)}     \x1b[33m[file]\x1b[0m`,
    );

  return currentDir;
}

export async function cd(currentDir, args) {
  const target = pathResolver(currentDir, args);

  const stat = await fs.stat(target);
  if (!stat.isDirectory()) {
    throw new Error("\x1b[31mNot a directory\x1b[0m");
  }
  return target;
}

export async function up(currentDir) {
  return path.dirname(currentDir);
}
