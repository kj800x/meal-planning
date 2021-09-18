import { AllergenDataObject, LOADER } from "../data-objects/Allergen";
import {
  fetchRecipeIdsByAllergen,
  RecipeDataObject,
} from "../data-objects/Recipe";
import { get } from "../util/get";
import { makeDomainObjectLoader } from "../util/makeDomainObjectLoader";
import { DomainObject } from "./types";

export interface AllergenGQLType {
  id: number;
  externalId?: string;
  name: string;
  image?: string;
  recipes: (RecipeDataObject | Error)[];
}

export const Allergen: DomainObject<AllergenGQLType, AllergenDataObject> = {
  resolver: {
    id: get("id"),
    externalId: get("externalId"),
    name: get("name"),
    image: get("image"),
    recipes: ({ id }, _, context) => {
      const recipeIds = fetchRecipeIdsByAllergen(id);
      return context.loaders.Recipe.loadMany(recipeIds);
    },
  },
  loader: makeDomainObjectLoader(LOADER),
};
