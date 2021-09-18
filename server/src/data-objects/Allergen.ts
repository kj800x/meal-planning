import { db, prepareIn } from "../db";

export interface AllergenDataObject {
  id: number;
  externalId?: string;
  name: string;
  image?: string;
}

const FETCH_ALLERGEN_IDS_BY_RECIPE_ID = db
  .prepare("SELECT allergenId FROM AllergenMap WHERE recipeId = ?")
  .pluck();

export function fetchAllergenIdsByRecipeId(recipeId: number): number[] {
  return FETCH_ALLERGEN_IDS_BY_RECIPE_ID.all(recipeId);
}

export const LOADER = prepareIn<number, AllergenDataObject>(
  "SELECT * FROM Allergen WHERE id IN (!?!)"
);
