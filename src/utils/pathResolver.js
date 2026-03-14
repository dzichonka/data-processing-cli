import path from "node:path";

export function pathResolver(currentDir, inputPath) {
  return path.resolve(currentDir, ...inputPath).normalize();
}
