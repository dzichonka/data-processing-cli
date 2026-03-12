import { Readable } from "node:stream";

export function createReadStream() {
  return new Readable({
    read() {},
  });
}
