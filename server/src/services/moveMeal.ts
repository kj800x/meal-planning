import { db } from "../db";
import { MealPlanDataObject } from "../data-objects/MealPlan";
import { MutationFunction } from "./types";

const update = db.prepare(
  "UPDATE ScheduledMeal SET date = ?, type = ? WHERE id = ?"
);

const select = db
  .prepare("SELECT mealPlanId FROM ScheduledMeal WHERE id = ?")
  .pluck();

export const moveMeal: MutationFunction<
  { mealId: number; type: string; date: number },
  MealPlanDataObject
> = (_, { mealId, type, date }, context) => {
  const planId = select.get(mealId);
  update.run(date, type, mealId);
  return context.loaders.MealPlan.load(planId);
};
