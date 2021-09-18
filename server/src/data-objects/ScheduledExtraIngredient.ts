import { db, prepareIn } from "../db";

export interface ScheduledExtraIngredientDataObject {
  id: number;
  mealPlanId: number;
  ingredientId: number;
  quantity: number;
  unit: string;
}

const FETCH_EXTRA_INGREDIENT_IDS_BY_MEAL_PLAN_ID = db
  .prepare("SELECT id FROM ScheduledExtraIngredient WHERE mealPlanId = ?")
  .pluck();

export function fetchExtraIngredientIdsByMealPlanId(id: number): number[] {
  return FETCH_EXTRA_INGREDIENT_IDS_BY_MEAL_PLAN_ID.all(id);
}

export const LOADER = prepareIn<number, ScheduledExtraIngredientDataObject>(
  "SELECT * FROM ScheduledExtraIngredient WHERE id IN (!?!)"
);
