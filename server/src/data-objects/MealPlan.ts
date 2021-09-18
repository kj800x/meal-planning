import { prepareIn } from "../db";

export interface MealPlanDataObject {
  id: number;
  breakfastSlots: number;
  lunchSlots: number;
  dinnerSlots: number;
  start: number;
  end: number;
}

export const LOADER = prepareIn<number, MealPlanDataObject>(
  "SELECT * FROM MealPlan WHERE id IN (!?!)"
);
