import path from "path";
import betterSqlite3 from "better-sqlite3";
import fs from "fs";

export const migration = (dataDir) => {
  // Migrate the DB
  const db = betterSqlite3(
    path.resolve(dataDir, "db.db") /*, { verbose: console.log }*/
  );
  const sql = fs.readFileSync(path.resolve(__dirname, "2.sql"), "utf8");

  db.exec(sql);
};
