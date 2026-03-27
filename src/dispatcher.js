import { cd, up, ls } from "./navigation.js";
import { csvToJson } from "./commands/csvToJson.js";
import { jsonToCsv } from "./commands/jsonToCsv.js";
import { count } from "./commands/count.js";
import { hash } from "./commands/hash.js";
import { hashCompare } from "./commands/hashCompare.js";
import { encrypt } from "./commands/encrypt.js";
import { decrypt } from "./commands/decrypt.js";
import { logStats } from "./commands/logStats.js";

export const commandMap = {
  cd,
  up,
  ls,
  "csv-to-json": csvToJson,
  "json-to-csv": jsonToCsv,
  count,
  hash,
  "hash-compare": hashCompare,
  encrypt,
  decrypt,
  "log-stats": logStats,
};
