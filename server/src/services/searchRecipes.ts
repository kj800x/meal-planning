import { db } from "../db";
import { SearchArgs } from "../resolvers/Query";

export function searchRecipes(searchArgs: SearchArgs) {
  const pattern = `'%${searchArgs.query.replace(/'/g, "\\'")}%'`;
  const filter = `(title LIKE ${pattern} OR description LIKE ${pattern})`;

  const items = db
    .prepare(
      `SELECT Recipe.id FROM Recipe WHERE ${filter} LIMIT ${searchArgs.limit} OFFSET ${searchArgs.offset}`
    )
    .pluck()
    .all();

  const total = db
    .prepare(`SELECT count(Recipe.id) FROM Recipe WHERE ${filter}`)
    .pluck()
    .get();

  return { ids: items, total };
}
