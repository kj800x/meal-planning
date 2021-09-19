import { MealPlanDataObject } from "../data-objects/MealPlan";
import { db } from "../db";
import { MutationFunction } from "./types";

const makeNew = db.prepare(
  "INSERT INTO ScheduledMeal (mealPlanId, recipeId, date, servings, type) VALUES (?, ?, ?, ?, ?)"
);

export const planRecipe: MutationFunction<
  {
    planId: number;
    recipeId: number;
    servings: number;
    type: string;
    date: number;
  },
  MealPlanDataObject
> = (_, { planId, recipeId, servings, type, date }, context) => {
  makeNew.run(planId, recipeId, date, servings, type);
  return context.loaders.MealPlan.load(planId);
};
