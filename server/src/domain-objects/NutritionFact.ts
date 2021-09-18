import { LOADER, NutritionFactDataObject } from "../data-objects/NutritionFact";
import { RecipeDataObject } from "../data-objects/Recipe";
import { get } from "../util/get";
import { makeDomainObjectLoader } from "../util/makeDomainObjectLoader";
import { DomainObject } from "./types";

interface NutritionFactGQLType {
  id: number;
  name: string;
  amount: number;
  unit: string;
  recipe: RecipeDataObject;
}

export const NutritionFact: DomainObject<
  NutritionFactGQLType,
  NutritionFactDataObject
> = {
  resolver: {
    id: get("id"),
    name: get("name"),
    amount: get("amount"),
    unit: get("unit"),
    recipe: ({ recipeId }, _, context) => {
      return context.loaders.Recipe.load(recipeId);
    },
  },
  loader: makeDomainObjectLoader(LOADER),
};
