import { db } from "../db";
import { get } from "./util/get";
import { order } from "./util/loaderOrderer";

const GROCERY_AISLE_LOADER = db.prepareIn(
  "SELECT * FROM GroceryAisle WHERE id IN (!?!)"
);
const FETCH_INGREDIENTS = db
  .prepare("SELECT id FROM Ingredient WHERE groceryAisleId = ?")
  .pluck();

export const GroceryAisle = {
  resolver: {
    id: get("id"),
    ordering: get("ordering"),
    ingredients: ({ id }, _, context) => {
      const recipeIds = FETCH_INGREDIENTS.all(id);
      return context.dataLoaders.Recipe.loadMany(recipeIds);
    },
  },
  loader: async (ids) => {
    const result = GROCERY_AISLE_LOADER.all(ids);
    return order(result, ids);
  },
};
