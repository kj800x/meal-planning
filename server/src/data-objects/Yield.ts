import { db, prepareIn } from "../db";

export interface YieldDataObject {
  id: number;
  servings: number;
  recipeId: number;
  ingredientId: number;
  quantity: number;
  unit: string;
}

const FETCH_BY_RECIPE_AND_SERVINGS = db
  .prepare("SELECT id FROM Yield WHERE recipeId = ? AND servings = ?")
  .pluck();

export function fetchByRecipeAndServings(
  recipeId: number,
  servings: number
): number[] {
  return FETCH_BY_RECIPE_AND_SERVINGS.all(recipeId, servings);
}

const FETCH_BY_RECIPE = db
  .prepare("SELECT id FROM Yield WHERE recipeId = ?")
  .pluck();

export function fetchByRecipe(recipeId: number): number[] {
  return FETCH_BY_RECIPE.all(recipeId);
}

const FETCH_VALID_SERVINGS = db
  .prepare("SELECT DISTINCT servings FROM Yield WHERE recipeId = ?")
  .pluck();

export function fetchValidServingsByRecipeId(recipeId: number): number[] {
  return FETCH_VALID_SERVINGS.all(recipeId);
}
export const LOADER = prepareIn<number, YieldDataObject>(
  "SELECT * FROM Yield WHERE id IN (!?!)"
);
