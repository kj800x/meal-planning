import { cancelMeal } from "../../services/cancelMeal";
import { createPlan } from "../../services/createPlan";
import { moveMeal } from "../../services/moveMeal";
import { planRecipe } from "../../services/planRecipe";
import { createRecipe } from "../../services/createRecipe";
import { MutationFunction } from "../../services/types";

import { withSafeError } from "./withSafeError";

function allWithFn<T>(fn: (arg1: T) => T) {
  return function (obj: { [key: string]: T }): { [key: string]: T } {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]));
  };
}

export const Mutation = {
  resolver: allWithFn<MutationFunction<any, any>>(withSafeError)({
    cancelMeal,
    createPlan,
    moveMeal,
    planRecipe,
    createRecipe,
  }),
};
