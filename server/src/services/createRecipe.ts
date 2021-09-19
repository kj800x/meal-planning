import { RecipeDataObject } from "../data-objects/Recipe";
import { db } from "../db";
import { MutationFunction } from "./types";

const makeNew = db.prepare(
  "INSERT INTO Recipe (title, source) VALUES (?, 'custom')"
);

export const createRecipe: MutationFunction<
  { title: string },
  RecipeDataObject
> = (_, { title }, context) => {
  const id = makeNew.run(title).lastInsertRowid;

  return context.loaders.Recipe.load(id as number);
};
