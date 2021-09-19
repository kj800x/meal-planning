import { MealPlanDataObject } from "../data-objects/MealPlan";
import { db } from "../db";
import { MutationFunction } from "./types";

const del = db.prepare("DELETE FROM ScheduledMeal WHERE id = ?");

const select = db
  .prepare("SELECT mealPlanId FROM ScheduledMeal WHERE id = ?")
  .pluck();

export const cancelMeal: MutationFunction<
  { mealId: number },
  MealPlanDataObject
> = (_, { mealId }, context) => {
  const planId = select.get(mealId);
  del.run(mealId);
  return context.loaders.MealPlan.load(planId);
};
