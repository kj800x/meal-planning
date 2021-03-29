import { db } from "../../db";

const del = db.prepare("DELETE FROM ScheduledMeal WHERE id = ?");

const select = db
  .prepare("SELECT mealPlanId FROM ScheduledMeal WHERE id = ?")
  .pluck();

export const cancelMeal = (_, { mealId }, context) => {
  const planId = select.get(mealId);
  del.run(mealId);
  return context.dataLoaders.MealPlan.load(planId);
};
