import os from "node:os";
import path from "node:path";
import { Worker } from "node:worker_threads";
import fsPromises from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { flagsParser } from "../utils/flagsParser.js";
import { pathResolver } from "../utils/pathResolver.js";
import { color } from "../utils/color.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workerPath = path.resolve(__dirname, "../workers/logWorker.js");

export async function logStats(currentDir, args) {
  const { input, output } = flagsParser(args);

  const inputPath = pathResolver(currentDir, [input]);
  const outputPath = pathResolver(currentDir, [output]);

  const stat = await fsPromises.stat(inputPath);

  const cpuCount = os.cpus().length;

  const chunkSize = Math.floor(stat.size / cpuCount);

  const workers = [];

  for (let i = 0; i < cpuCount; i++) {
    const start = i * chunkSize;

    const end = i === cpuCount - 1 ? stat.size - 1 : start + chunkSize;

    workers.push(
      new Promise((resolve, reject) => {
        const worker = new Worker(workerPath, {
          workerData: {
            path: inputPath,
            start,
            end,
          },
        });

        worker.on("message", (data) => {
          if (data.error) {
            reject(new Error(data.error));
          } else {
            resolve(data);
          }
        });

        worker.on("error", reject);

        worker.on("exit", (code) => {
          if (code !== 0) {
            reject(
              new Error(`${color(31, `Worker stopped with code ${code}`)}`),
            );
          }
        });
      }),
    );
  }

  const partialStats = await Promise.all(workers);

  const result = {
    total: 0,
    levels: {},
    status: {},
    paths: {},
    responseTimeSum: 0,
  };

  for (const part of partialStats) {
    result.total += part.total;
    result.responseTimeSum += part.responseTimeSum;

    for (const [k, v] of Object.entries(part.levels)) {
      result.levels[k] = (result.levels[k] || 0) + v;
    }

    for (const [k, v] of Object.entries(part.status)) {
      result.status[k] = (result.status[k] || 0) + v;
    }

    for (const [k, v] of Object.entries(part.paths)) {
      result.paths[k] = (result.paths[k] || 0) + v;
    }
  }

  const topPaths = Object.entries(result.paths)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  const avgResponseTimeMs =
    result.total === 0 ? 0 : result.responseTimeSum / result.total;

  const outputJson = {
    total: result.total,
    levels: result.levels,
    status: result.status,
    topPaths,
    avgResponseTimeMs,
  };

  await fsPromises.writeFile(outputPath, JSON.stringify(outputJson, null, 2));

  return currentDir;
}
