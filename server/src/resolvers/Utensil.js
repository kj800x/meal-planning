import { db } from "../db";
import { get } from "./util/get";
import { order } from "./util/loaderOrderer";

const UTENSIL_LOADER = db.prepareIn("SELECT * FROM Utensil WHERE id IN (!?!)");
const FETCH_RECIPES = db
  .prepare("SELECT recipeId FROM UtensilMap WHERE utensilId = ?")
  .pluck();

export const Utensil = {
  resolver: {
    id: get("id"),
    externalId: get("externalId"),
    name: get("name"),

    recipes: ({ id }, _, context) => {
      const results = FETCH_RECIPES.all(id);
      return context.dataLoaders.Recipe.loadMany(results);
    },
  },
  loader: async (ids) => {
    const result = UTENSIL_LOADER.all(ids);
    return order(result, ids);
  },
};
