import { db, prepareIn } from "../db";

export interface ScheduledMealDataObject {
  id: number;
  mealPlanId: number;
  recipeId: number;
  date?: number;
  servings: number;
  type: string;
}

const FETCH_MEAL_IDS_BY_MEAL_PLAN_ID = db
  .prepare("SELECT id FROM ScheduledMeal WHERE mealPlanId = ?")
  .pluck();

export function fetchMealIdsByMealPlanId(id: number): number[] {
  return FETCH_MEAL_IDS_BY_MEAL_PLAN_ID.all(id);
}

export const LOADER = prepareIn<number, ScheduledMealDataObject>(
  "SELECT * FROM ScheduledMeal WHERE id IN (!?!)"
);
