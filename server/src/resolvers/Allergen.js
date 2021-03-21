import { db } from "../db";
import { get } from "./util/get";
import { order } from "./util/loaderOrderer";

const ALLERGEN_LOADER = db.prepareIn(
  "SELECT * FROM Allergen WHERE id IN (!?!)"
);
const FETCH_RECIPES = db
  .prepare("SELECT recipeId FROM AllergenMap WHERE allergenId = ?")
  .pluck();

export const Allergen = {
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
    const result = ALLERGEN_LOADER.all(ids);
    return order(result, ids);
  },
};
