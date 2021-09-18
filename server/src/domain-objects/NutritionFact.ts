import { db } from "../db";
import { get } from "./util/get";
import { order } from "./util/loaderOrderer";

const NUTRITION_FACT_LOADER = db.prepareIn(
  "SELECT * FROM NutritionFact WHERE id IN (!?!)"
);

export const NutritionFact = {
  resolver: {
    id: get("id"),
    name: get("name"),
    amount: get("amount"),
    unit: get("unit"),
    recipe: ({ recipeId }, _, context) => {
      return context.dataLoaders.Recipe.load(recipeId);
    },
  },
  loader: async (ids) => {
    const result = NUTRITION_FACT_LOADER.all(ids);
    return order(result, ids);
  },
};
