import { LOADER, MealPlanDataObject } from "../data-objects/MealPlan";
import {
  fetchExtraIngredientIdsByMealPlanId,
  ScheduledExtraIngredientDataObject,
} from "../data-objects/ScheduledExtraIngredient";
import {
  fetchMealIdsByMealPlanId,
  ScheduledMealDataObject,
} from "../data-objects/ScheduledMeal";
import { get } from "../util/get";
import { makeDomainObjectLoader } from "../util/makeDomainObjectLoader";
import { DomainObject } from "./types";

export interface MealPlanGQLType {
  id: number;
  breakfastSlots: number;
  lunchSlots: number;
  dinnerSlots: number;
  start: number;
  end: number;
  extraIngredients: (ScheduledExtraIngredientDataObject | Error)[];
  meals: (ScheduledMealDataObject | Error)[];
}

export const MealPlan: DomainObject<MealPlanGQLType, MealPlanDataObject> = {
  resolver: {
    id: get("id"),
    breakfastSlots: get("breakfastSlots"),
    lunchSlots: get("lunchSlots"),
    dinnerSlots: get("dinnerSlots"),
    start: get("start"),
    end: get("end"),

    extraIngredients: ({ id }, _, context) => {
      const ids = fetchExtraIngredientIdsByMealPlanId(id);
      return context.loaders.ScheduledExtraIngredient.loadMany(ids);
    },
    meals: ({ id }, _, context) => {
      const ids = fetchMealIdsByMealPlanId(id);
      return context.loaders.ScheduledMeal.loadMany(ids);
    },
  },
  loader: makeDomainObjectLoader(LOADER),
};
