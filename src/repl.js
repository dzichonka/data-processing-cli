import readline from "node:readline";
import { argParser } from "./utils/argParser.js";
import { commandMap } from "./dispatcher.js";

export function repl(initialDir) {
  let currentDir = initialDir;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  rl.prompt();

  rl.on("line", async (line) => {
    const input = line.trim();

    if (input === ".exit") {
      console.log("Thank you for using Data Processing CLI!");
      process.exit(0);
    }

    try {
      const { command, args } = argParser(input);

      const handler = commandMap[command];

      if (!handler) {
        console.log("Invalid input");
      } else {
        currentDir = await handler(currentDir, args);
      }

      console.log(`You are currently in ${currentDir}`);
    } catch {
      console.log("Operation failed");
    }

    rl.prompt();
  });

  process.on("SIGINT", () => {
    console.log("\nThank you for using Data Processing CLI!");
    process.exit(0);
  });

  rl.on("close", () => {
    console.log("\nThank you for using Data Processing CLI!");
    process.exit(0);
  });
}
