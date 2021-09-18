import { prepareIn } from "../db";

export interface GroceryAisleDataObject {
  id: number;
  name: string;
  ordering: number;
}

export const LOADER = prepareIn<number, GroceryAisleDataObject>(
  "SELECT * FROM GroceryAisle WHERE id IN (!?!)"
);
