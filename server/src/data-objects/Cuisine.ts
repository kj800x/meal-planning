import { db, prepareIn } from "../db";

export interface CuisineDataObject {
  id: number;
  externalId?: string;
  name: string;
  image?: string;
}

const FETCH_CUISINE_IDS_BY_RECIPE_ID = db
  .prepare("SELECT cuisineId FROM CuisineMap WHERE recipeId = ?")
  .pluck();

export function fetchCuisineIdsByRecipeId(recipeId: number): number[] {
  return FETCH_CUISINE_IDS_BY_RECIPE_ID.all(recipeId);
}

export const LOADER = prepareIn<number, CuisineDataObject>(
  "SELECT * FROM Cuisine WHERE id IN (!?!)"
);
