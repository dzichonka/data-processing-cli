export function flagsParser(args) {
  const result = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith("--")) continue;

    const key = arg.slice(2);
    const next = args[i + 1];

    if (!next || next.startsWith("--")) {
      result[key] = true;
    } else {
      result[key] = next;
      i++;
    }
  }

  return result;
}
