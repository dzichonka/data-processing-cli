import { Transform } from "node:stream";

export function createTransformStream() {
  return new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk);
    },
  });
}
