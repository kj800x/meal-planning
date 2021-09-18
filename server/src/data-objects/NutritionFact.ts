import { db, prepareIn } from "../db";

export interface NutritionFactDataObject {
  id: number;
  recipeId: number;
  name: string;
  amount: number;
  unit: string;
}

const FETCH_NUTRITION_FACT_IDS_BY_RECIPE_ID = db
  .prepare("SELECT id FROM NutritionFact WHERE recipeId = ?")
  .pluck();

export function fetchNutritionFactIdsByRecipeId(recipeId: number): number[] {
  return FETCH_NUTRITION_FACT_IDS_BY_RECIPE_ID.all(recipeId);
}

export const LOADER = prepareIn<number, NutritionFactDataObject>(
  "SELECT * FROM NutritionFact WHERE id IN (!?!)"
);
