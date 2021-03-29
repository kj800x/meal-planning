import { db } from "../db";
import { get } from "./util/get";
import { order } from "./util/loaderOrderer";

const MEAL_LOADER = db.prepareIn(
  "SELECT * FROM ScheduledMeal WHERE id IN (!?!)"
);
const FETCH_INGREDIENTS = db
  .prepare("SELECT id FROM Yield WHERE recipeId = ? AND servings = ?")
  .pluck();

export const ScheduledMeal = {
  resolver: {
    id: get("id"),
    type: get("type"),
    servings: get("servings"),
    date: get("date"),

    recipe: ({ recipeId }, _, context) => {
      return context.dataLoaders.Recipe.load(recipeId);
    },
    mealPlan: ({ mealPlanId }, _, context) => {
      return context.dataLoaders.MealPlan.load(mealPlanId);
    },
    ingredients: ({ recipeId, servings }, _, context) => {
      const yieldIds = FETCH_INGREDIENTS.all(recipeId, servings);
      return context.dataLoaders.Yield.loadMany(yieldIds);
    },
  },
  loader: async (ids) => {
    const result = MEAL_LOADER.all(ids);
    return order(result, ids);
  },
};
