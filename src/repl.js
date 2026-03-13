import readline from "node:readline";

export function startRepl(initialDir) {
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
      console.log(`Current directory from REPL: ${currentDir}`);
      console.log(`Command received: ${input}`);
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
