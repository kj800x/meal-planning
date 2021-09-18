import { db, prepareIn } from "../db";

export interface UtensilDataObject {
  id: number;
  externalId?: string;
  name: string;
}

const FETCH_UTENSIL_IDS_BY_RECIPE_ID = db
  .prepare("SELECT utensilId FROM UtensilMap WHERE recipeId = ?")
  .pluck();

export function fetchUtensilIdsByRecipeId(recipeId: number): number[] {
  return FETCH_UTENSIL_IDS_BY_RECIPE_ID.all(recipeId);
}

export const LOADER = prepareIn<number, UtensilDataObject>(
  "SELECT * FROM Utensil WHERE id IN (!?!)"
);
