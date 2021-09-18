import { MealPlanDataObject } from "../data-objects/MealPlan";
import { RecipeDataObject } from "../data-objects/Recipe";
import { LOADER, ScheduledMealDataObject } from "../data-objects/ScheduledMeal";
import {
  fetchByRecipeAndServings,
  YieldDataObject,
} from "../data-objects/Yield";
import { get } from "../util/get";
import { makeDomainObjectLoader } from "../util/makeDomainObjectLoader";
import { DomainObject } from "./types";

interface ScheduledMealGQLType {
  id: number;
  servings: number;
  recipe: RecipeDataObject;
  ingredients: (YieldDataObject | Error)[];
  mealPlan: MealPlanDataObject;
}

export const ScheduledMeal: DomainObject<
  ScheduledMealGQLType,
  ScheduledMealDataObject
> = {
  resolver: {
    id: get("id"),
    servings: get("servings"),

    recipe: ({ recipeId }, _, context) => {
      return context.loaders.Recipe.load(recipeId);
    },
    mealPlan: ({ mealPlanId }, _, context) => {
      return context.loaders.MealPlan.load(mealPlanId);
    },
    ingredients: ({ recipeId, servings }, _, context) => {
      const yieldIds = fetchByRecipeAndServings(recipeId, servings);
      return context.loaders.Yield.loadMany(yieldIds);
    },
  },
  loader: makeDomainObjectLoader(LOADER),
};
