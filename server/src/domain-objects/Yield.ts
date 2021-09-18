import { IngredientDataObject } from "../data-objects/Ingredient";
import { RecipeDataObject } from "../data-objects/Recipe";
import { LOADER, YieldDataObject } from "../data-objects/Yield";
import { get } from "../util/get";
import { makeDomainObjectLoader } from "../util/makeDomainObjectLoader";
import { DomainObject } from "./types";

interface YieldGQLType {
  id: number;
  servings: number;
  quantity: number;
  unit: string;
  recipe: RecipeDataObject;
  ingredient: IngredientDataObject;
}

export const Yield: DomainObject<YieldGQLType, YieldDataObject> = {
  resolver: {
    id: get("id"),
    servings: get("servings"),
    quantity: get("quantity"),
    unit: get("unit"),

    recipe: ({ recipeId }, _, context) => {
      return context.loaders.Recipe.load(recipeId);
    },
    ingredient: ({ ingredientId }, _, context) => {
      return context.loaders.Ingredient.load(ingredientId);
    },
  },
  loader: makeDomainObjectLoader(LOADER),
};
