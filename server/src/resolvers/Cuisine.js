import { db } from "../db";
import { get } from "./util/get";
import { order } from "./util/loaderOrderer";

const CUISINE_LOADER = db.prepareIn("SELECT * FROM Cuisine WHERE id IN (!?!)");
const FETCH_RECIPES = db
  .prepare("SELECT recipeId FROM CuisineMap WHERE cuisineId = ?")
  .pluck();

export const Cuisine = {
  resolver: {
    id: get("id"),
    externalId: get("externalId"),
    name: get("name"),
    image: get("image"),
    recipes: ({ id }, _, context) => {
      const recipeIds = FETCH_RECIPES.all(id);
      return context.dataLoaders.Recipe.loadMany(recipeIds);
    },
  },
  loader: async (ids) => {
    const result = CUISINE_LOADER.all(ids);
    return order(result, ids);
  },
};
