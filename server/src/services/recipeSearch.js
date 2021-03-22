import { db } from "../db";

import { tokenize } from "s-exp-parser/tokenize";
import { parse } from "s-exp-parser/parse";
import {
  extractFilterNodes,
  extractSortNode,
  asTextNodes,
} from "s-exp-parser/util";
import { buildFilterQuery } from "./buildFilterQuery";
import { buildSortQuery } from "./buildSortQuery";

export const runRecipeSearch = ({ query, limit, offset }) => {
  const parsed = parse(tokenize(`(fulltext \"${query}\")`));
  const parsedText = asTextNodes(parsed);
  const filterNodes = extractFilterNodes(parsedText)[0];
  const sortNode = extractSortNode(parsedText);
  const filter = buildFilterQuery(filterNodes);
  const [join, sort] = buildSortQuery(sortNode);

  const recipes = db
    .prepare(
      `SELECT Recipe.id FROM Recipe ${join} WHERE ${filter} ${sort} LIMIT ${limit} OFFSET ${offset}`
    )
    .pluck()
    .all();

  const total = db
    .prepare(`SELECT count(Recipe.id) FROM Recipe WHERE ${filter}`)
    .pluck()
    .get();

  return { recipes, total };
};
