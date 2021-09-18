import { CuisineDataObject, LOADER } from "../data-objects/Cuisine";
import {
  fetchRecipeIdsByCuisine,
  RecipeDataObject,
} from "../data-objects/Recipe";
import { makeDomainObjectLoader } from "../util/makeDomainObjectLoader";
import { DomainObject } from "./types";
import { get } from "../util/get";

export interface CuisineGQLType {
  id: number;
  externalId?: string;
  name: string;
  image?: string;
  recipes: (RecipeDataObject | Error)[];
}

export const Cuisine: DomainObject<CuisineGQLType, CuisineDataObject> = {
  resolver: {
    id: get("id"),
    externalId: get("externalId"),
    name: get("name"),
    image: get("image"),
    recipes: ({ id }, _, context) => {
      const recipeIds = fetchRecipeIdsByCuisine(id);
      return context.loaders.Recipe.loadMany(recipeIds);
    },
  },
  loader: makeDomainObjectLoader(LOADER),
};
