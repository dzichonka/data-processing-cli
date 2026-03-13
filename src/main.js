import os from "node:os";
import { startRepl } from "./repl.js";
async function main() {
  try {
    console.log("Welcome to Data Processing CLI!");
    const currentDir = os.homedir();
    console.log(`You are currently in ${currentDir}`);
    startRepl(currentDir);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
