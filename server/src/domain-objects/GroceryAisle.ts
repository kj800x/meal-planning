import { GroceryAisleDataObject, LOADER } from "../data-objects/GroceryAisle";
import {
  fetchIngredientIdsByAisleId,
  IngredientDataObject,
} from "../data-objects/Ingredient";
import { makeDomainObjectLoader } from "../util/makeDomainObjectLoader";
import { DomainObject } from "./types";
import { get } from "../util/get";

export interface GroceryAisleGQLType {
  id: number;
  name: string;
  ordering: number;
  ingredients: (IngredientDataObject | Error)[];
}

export const GroceryAisle: DomainObject<
  GroceryAisleGQLType,
  GroceryAisleDataObject
> = {
  resolver: {
    id: get("id"),
    name: get("name"),
    ordering: get("ordering"),
    ingredients: ({ id }, _, context) => {
      const ids = fetchIngredientIdsByAisleId(id);
      return context.loaders.Ingredient.loadMany(ids);
    },
  },
  loader: makeDomainObjectLoader(LOADER),
};
