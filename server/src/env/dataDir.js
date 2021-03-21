import path from "path";
import process from "process";

const { env } = process;

const DEFAULT_DATA_DIR = "../data";

export const DATA_DIR = path.resolve(env.DATA_DIR || DEFAULT_DATA_DIR);
