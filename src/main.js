import { repl } from "./repl.js";
import url from "node:url";

async function main() {
  try {
    console.log("Welcome to Data Processing CLI!");
    const currentDir = url.fileURLToPath(new URL("../", import.meta.url));
    console.log(`You are currently in ${currentDir}`);
    repl(currentDir);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
