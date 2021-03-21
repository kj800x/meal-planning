import { db } from "../db";
import { get } from "./util/get";
import { order } from "./util/loaderOrderer";

const YIELD_LOADER = db.prepareIn("SELECT * FROM Yield WHERE id IN (!?!)");

export const Yield = {
  resolver: {
    id: get("id"),
    servings: get("servings"),
    quantity: get("quantity"),
    unit: get("unit"),

    recipe: ({ recipeId }, _, context) => {
      return context.dataLoaders.Recipe.load(recipeId);
    },
    ingredient: ({ ingredientId }, _, context) => {
      return context.dataLoaders.Ingredient.load(ingredientId);
    },
  },
  loader: async (ids) => {
    const result = YIELD_LOADER.all(ids);
    return order(result, ids);
  },
};
