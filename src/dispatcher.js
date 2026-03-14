import { cd, up, ls } from "./navigation.js";
import { csvToJson } from "./commands/csvToJson.js";
import { jsonToCsv } from "./commands/jsonToCsv.js";

export const commandMap = {
  cd,
  up,
  ls,
  "csv-to-json": csvToJson,
  "json-to-csv": jsonToCsv,
};
