import { db } from "../db";
import { get } from "./util/get";
import { order } from "./util/loaderOrderer";

const INGREDIENT_LOADER = db.prepareIn(
  "SELECT * FROM Ingredient WHERE id IN (!?!)"
);

export const Ingredient = {
  resolver: {
    id: get("id"),
    externalId: get("externalId"),
    name: get("name"),
    image: get("image"),
    groceryAisle: ({ groceryAisleId }, _, context) => {
      if (!groceryAisleId) {
        return null;
      }
      return context.dataLoaders.GroceryAisle.load(groceryAisleId);
    },
  },
  loader: async (ids) => {
    const result = INGREDIENT_LOADER.all(ids);
    return order(result, ids);
  },
};
