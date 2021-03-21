import path from "path";
import betterSqlite3 from "better-sqlite3";
import mkdirp from "mkdirp";
import fs from "fs";

export const migration = (dataDir) => {
  console.log(dataDir);

  mkdirp.sync(path.resolve(dataDir));

  // Create the DB
  const db = betterSqlite3(
    path.resolve(dataDir, "db.db") /*, { verbose: console.log }*/
  );
  const sql = fs.readFileSync(path.resolve(__dirname, "1.sql"), "utf8");

  db.exec(sql);

  mkdirp.sync(path.join(dataDir, "assets"));
};
