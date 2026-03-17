import readline from "node:readline";
import { argParser } from "./utils/argParser.js";
import { commandMap } from "./dispatcher.js";
import {
  logGoodbye,
  logFailedOperation,
  logCurrentDir,
  logInvalidInput,
} from "./utils/logs.js";

export function repl(initialDir) {
  let currentDir = initialDir;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\x1b[34m> \x1b[0m",
  });

  rl.prompt();

  rl.on("line", async (line) => {
    const input = line.trim();

    if (input === ".exit") {
      logGoodbye();
      process.exit(0);
    }

    try {
      const { command, args } = argParser(input);

      const handler = commandMap[command];

      if (!handler) {
        logInvalidInput();
      } else {
        currentDir = await handler(currentDir, args);
      }
      logCurrentDir(currentDir);
    } catch {
      logFailedOperation();
    }

    rl.prompt();
  });

  process.on("SIGINT", () => {
    logGoodbye();
    process.exit(0);
  });

  rl.on("close", () => {
    logGoodbye();
    process.exit(0);
  });
}
