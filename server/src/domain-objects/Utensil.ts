import {
  fetchRecipeIdsByUtensil,
  RecipeDataObject,
} from "../data-objects/Recipe";
import { LOADER, UtensilDataObject } from "../data-objects/Utensil";
import { get } from "../util/get";
import { makeDomainObjectLoader } from "../util/makeDomainObjectLoader";
import { DomainObject } from "./types";

interface UtensilGQLType {
  id: number;
  externalId?: string;
  name: string;
  recipes: (RecipeDataObject | Error)[];
}

export const Utensil: DomainObject<UtensilGQLType, UtensilDataObject> = {
  resolver: {
    id: get("id"),
    externalId: get("externalId"),
    name: get("name"),

    recipes: ({ id }, _, context) => {
      const results = fetchRecipeIdsByUtensil(id);
      return context.loaders.Recipe.loadMany(results);
    },
  },
  loader: makeDomainObjectLoader(LOADER),
};
