import betterSqlite3 from "better-sqlite3";
import path from "path";
import { DATA_DIR } from "./env/dataDir";

export const db = betterSqlite3(
  path.resolve(DATA_DIR, "db.db") /*, { verbose: console.log }*/
);

function chunk(chunkSize, array) {
  return array.reduce(function (previous, current) {
    var chunk;
    if (
      previous.length === 0 ||
      previous[previous.length - 1].length === chunkSize
    ) {
      chunk = [];
      previous.push(chunk);
    } else {
      chunk = previous[previous.length - 1];
    }
    chunk.push(current);
    return previous;
  }, []);
}

db.prepareIn = (statement) => ({
  all: function all(arr) {
    if (arr.length > 999) {
      return chunk(999, arr).flatMap(all);
    }

    const sql = statement.replace("!?!", arr.map((_) => "?").join());
    return db.prepare(sql).all(...arr);
  },
});

db.pragma("journal_mode = WAL");
