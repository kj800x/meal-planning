import path from "path";
import process from "process";

const { env } = process;

export const DATA_DIR = path.resolve(
  env.DATA_DIR ||
    (env.BASE_DATA_DIR
      ? path.join(env.BASE_DATA_DIR, "meal-planning")
      : false) ||
    path.join(__dirname, "..", "..", "..", "data")
);
