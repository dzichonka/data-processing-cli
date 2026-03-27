import { color } from "./color.js";
export function logError(message) {
  console.error(`${color(31, "Error:")} ${message}`);
}
export function logCurrentDir(currentDir) {
  console.error(`${color(32, `You are currently in ${currentDir}`)}`);
}
export function logWelcome() {
  console.error(`${color(35, "Welcome to Data Processing CLI!")}`);
}
export function logGoodbye() {
  console.error(`${color(35, "Thank you for using Data Processing CLI!")}`);
}
export function logFailedOperation() {
  console.log(`${color(31, "Operation failed")}`);
}
export function logInvalidInput() {
  console.error(`${color(31, "Invalid input")}`);
}
