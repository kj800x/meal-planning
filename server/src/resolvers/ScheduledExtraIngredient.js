import { db } from "../db";
import { get } from "./util/get";
import { order } from "./util/loaderOrderer";

const EXTRA_INGREDIENT_LOADER = db.prepareIn(
  "SELECT * FROM ScheduledExtraIngredient WHERE id IN (!?!)"
);

export const ScheduledExtraIngredient = {
  resolver: {
    id: get("id"),
    quantity: get("quantity"),
    unit: get("unit"),

    ingredient: ({ ingredientId }, _, context) => {
      return context.dataLoaders.Ingredient.load(ingredientId);
    },
    mealPlan: ({ mealPlanId }, _, context) => {
      return context.dataLoaders.MealPlan.load(mealPlanId);
    },
  },
  loader: async (ids) => {
    const result = EXTRA_INGREDIENT_LOADER.all(ids);
    return order(result, ids);
  },
};
