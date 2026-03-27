import path from "node:path";

export function pathResolver(currentDir, pathArgs) {
  return path.normalize(path.resolve(currentDir, ...pathArgs));
}
