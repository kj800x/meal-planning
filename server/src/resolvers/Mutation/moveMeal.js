import { db } from "../../db";

const update = db.prepare(
  "UPDATE ScheduledMeal SET date = ?, type = ? WHERE id = ?"
);

const select = db
  .prepare("SELECT mealPlanId FROM ScheduledMeal WHERE id = ?")
  .pluck();

export const moveMeal = (_, { mealId, type, date }, context) => {
  const planId = select.get(mealId);
  update.run(date, type, mealId);
  return context.dataLoaders.MealPlan.load(planId);
};
