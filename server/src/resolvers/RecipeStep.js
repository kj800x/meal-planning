import { db } from "../db";
import { get } from "./util/get";
import { order } from "./util/loaderOrderer";

const RECIPE_STEP_LOADER = db.prepareIn(
  "SELECT * FROM RecipeStep WHERE id IN (!?!)"
);

export const RecipeStep = {
  resolver: {
    id: get("id"),
    ordering: get("ordering"),
    image: get("image"),
    instructions: get("instructions"),

    recipe: ({ recipeId }, _, context) => {
      return context.dataLoaders.Recipe.load(recipeId);
    },
  },
  loader: async (ids) => {
    const result = RECIPE_STEP_LOADER.all(ids);
    return order(result, ids);
  },
};
