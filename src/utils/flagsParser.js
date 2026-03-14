export function flagsParser(args) {
  const result = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = args[i + 1];
      result[key] = value;
      i++;
    } else continue;
  }
  return result;
}
