import { IngredientDataObject } from "../data-objects/Ingredient";
import { MealPlanDataObject } from "../data-objects/MealPlan";
import {
  LOADER,
  ScheduledExtraIngredientDataObject,
} from "../data-objects/ScheduledExtraIngredient";
import { get } from "../util/get";
import { makeDomainObjectLoader } from "../util/makeDomainObjectLoader";
import { DomainObject } from "./types";

interface ScheduledExtraIngredientGQLType {
  id: number;
  quantity: number;
  unit: string;
  ingredient: IngredientDataObject;
  mealPlan: MealPlanDataObject;
}

export const ScheduledExtraIngredient: DomainObject<
  ScheduledExtraIngredientGQLType,
  ScheduledExtraIngredientDataObject
> = {
  resolver: {
    id: get("id"),
    quantity: get("quantity"),
    unit: get("unit"),

    ingredient: ({ ingredientId }, _, context) => {
      return context.loaders.Ingredient.load(ingredientId);
    },
    mealPlan: ({ mealPlanId }, _, context) => {
      return context.loaders.MealPlan.load(mealPlanId);
    },
  },
  loader: makeDomainObjectLoader(LOADER),
};
