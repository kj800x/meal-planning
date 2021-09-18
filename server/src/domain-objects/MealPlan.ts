import { db } from "../db";
import { get } from "./util/get";
import { order } from "./util/loaderOrderer";

const MEAL_PLAN_LOADER = db.prepareIn(
  "SELECT * FROM MealPlan WHERE id IN (!?!)"
);
const FETCH_EXTRA_INGREDIENTS = db
  .prepare("SELECT id FROM ScheduledExtraIngredient WHERE mealPlanId = ?")
  .pluck();
const FETCH_MEALS = db
  .prepare("SELECT id FROM ScheduledMeal WHERE mealPlanId = ?")
  .pluck();

export const MealPlan = {
  resolver: {
    id: get("id"),
    breakfastSlots: get("breakfastSlots"),
    lunchSlots: get("lunchSlots"),
    dinnerSlots: get("dinnerSlots"),
    start: get("start"),
    end: get("end"),

    extraIngredients: ({ id }, _, context) => {
      const ids = FETCH_EXTRA_INGREDIENTS.all(id);
      return context.dataLoaders.ScheduledExtraIngredient.loadMany(ids);
    },
    meals: ({ id }, _, context) => {
      const ids = FETCH_MEALS.all(id);
      return context.dataLoaders.ScheduledMeal.loadMany(ids);
    },
  },
  loader: async (ids) => {
    const result = MEAL_PLAN_LOADER.all(ids);
    return order(result, ids);
  },
};
