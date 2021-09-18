import { db, prepareIn } from "../db";

export interface IngredientDataObject {
  id: number;
  externalId?: string;
  name: string;
  image?: string;
  groceryAisleId: number;
}

const FETCH_INGREDIENT_IDS_BY_AISLE_ID = db
  .prepare("SELECT id FROM Ingredient WHERE groceryAisleId = ?")
  .pluck();

export function fetchIngredientIdsByAisleId(aisleId: number): number[] {
  return FETCH_INGREDIENT_IDS_BY_AISLE_ID.all(aisleId);
}

export const LOADER = prepareIn<number, IngredientDataObject>(
  "SELECT * FROM Ingredient WHERE id IN (!?!)"
);
