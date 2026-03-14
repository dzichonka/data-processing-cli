import { repl } from "./repl.js";
import os from "node:os";

async function main() {
  try {
    console.log("Welcome to Data Processing CLI!");
    const currentDir = os.homedir();
    console.log(`You are currently in ${currentDir}`);
    repl(currentDir);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
