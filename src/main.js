import { repl } from "./repl.js";
import os from "node:os";
import { logError, logWelcome, logCurrentDir } from "./utils/logs.js";

async function main() {
  try {
    logWelcome();
    const currentDir = os.homedir();
    logCurrentDir(currentDir);
    repl(currentDir);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
}

main();
