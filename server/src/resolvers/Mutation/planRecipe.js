import { db } from "../../db";

const makeNew = db.prepare(
  "INSERT INTO ScheduledMeal (mealPlanId, recipeId, date, servings, type) VALUES (?, ?, ?, ?, ?)"
);

export const planRecipe = (
  _,
  { planId, recipeId, servings, type, date },
  context
) => {
  makeNew.run(planId, recipeId, date, servings, type);
  return context.dataLoaders.MealPlan.load(planId);
};
