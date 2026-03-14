import path from "node:path";

export function pathResolver(currentDir, inputPath) {
  return path.normalize(path.resolve(currentDir, ...inputPath));
}
