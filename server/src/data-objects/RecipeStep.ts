import { db, prepareIn } from "../db";

export interface RecipeStepDataObject {
  id: number;
  ordering: number;
  image?: string;
  instructions: string;
  recipeId: number;
}

const FETCH_STEP_IDS_BY_RECIPE_ID = db
  .prepare("SELECT id FROM RecipeStep WHERE recipeId = ? ORDER BY ordering ASC")
  .pluck();

export function fetchStepIdsByRecipeId(recipeId: number): number[] {
  return FETCH_STEP_IDS_BY_RECIPE_ID.all(recipeId);
}

export const LOADER = prepareIn<number, RecipeStepDataObject>(
  "SELECT * FROM RecipeStep WHERE id IN (!?!)"
);
