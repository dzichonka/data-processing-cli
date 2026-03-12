import { pipeline } from "node:stream/promises";
import { createReadStream } from "./streams/read.js";
import { createTransformStream } from "./streams/transform.js";
import { createWriteStream } from "./streams/write.js";

async function main() {
  try {
    console.log("TODO: implement me!)");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
