import { workerData, parentPort } from "node:worker_threads";
import fs from "node:fs";
import readline from "node:readline";

const { path, start, end } = workerData;

const stats = {
  total: 0,
  levels: {},
  status: {},
  paths: {},
  responseTimeSum: 0,
};

const stream = fs.createReadStream(path, {
  start,
  end,
  encoding: "utf-8",
});

const rl = readline.createInterface({
  input: stream,
  crlfDelay: Infinity,
});

let isFirstLine = true;

rl.on("line", (line) => {
  if (isFirstLine && start !== 0) {
    isFirstLine = false;
    return;
  }

  isFirstLine = false;

  if (!line) return;

  const parts = line.split(" ");

  if (parts.length < 7) return;

  const level = parts[1];
  const statusCode = Number(parts[3]);
  const responseTime = Number(parts[4]);
  const pathVal = parts[6];

  stats.total++;

  stats.levels[level] = (stats.levels[level] || 0) + 1;

  const statusClass = Math.floor(statusCode / 100) + "xx";
  stats.status[statusClass] = (stats.status[statusClass] || 0) + 1;

  stats.paths[pathVal] = (stats.paths[pathVal] || 0) + 1;

  stats.responseTimeSum += responseTime;
});

rl.on("close", () => {
  parentPort.postMessage(stats);
});

rl.on("error", (err) => {
  parentPort.postMessage({ error: err.message });
});
