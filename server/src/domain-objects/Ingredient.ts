import { IngredientDataObject, LOADER } from "../data-objects/Ingredient";
import { makeDomainObjectLoader } from "../util/makeDomainObjectLoader";
import { DomainObject } from "./types";
import { get } from "../util/get";
import { GroceryAisleDataObject } from "../data-objects/GroceryAisle";

export interface IngredientGQLType {
  id: number;
  externalId?: string;
  name: string;
  image?: string;
  groceryAisle: Promise<GroceryAisleDataObject> | null;
}

export const Ingredient: DomainObject<IngredientGQLType, IngredientDataObject> =
  {
    resolver: {
      id: get("id"),
      externalId: get("externalId"),
      name: get("name"),
      image: get("image"),
      groceryAisle: ({ groceryAisleId }, _, context) => {
        if (!groceryAisleId) {
          return null;
        }
        return context.loaders.GroceryAisle.load(groceryAisleId);
      },
    },
    loader: makeDomainObjectLoader(LOADER),
  };
