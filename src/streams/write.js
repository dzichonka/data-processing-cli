import { Writable } from "node:stream";

export function createWriteStream() {
  return new Writable({
    write(chunk, encoding, callback) {
      callback();
    },
  });
}
