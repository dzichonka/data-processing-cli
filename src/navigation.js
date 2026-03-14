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

  folders.sort();
  files.sort();

  for (const f of folders)
    console.log(`${f}${" ".repeat(maxLength - f.length)}   [folder]`);
  for (const f of files)
    console.log(`${f}${" ".repeat(maxLength - f.length)}     [file]`);

  return currentDir;
}

export async function cd(currentDir, args) {
  const target = pathResolver(currentDir, args);

  const stat = await fs.stat(target);
  if (!stat.isDirectory()) {
    throw new Error("Not a directory");
  }
  return target;
}

export async function up(currentDir) {
  return path.dirname(currentDir);
}
