import { createPlan } from "./createPlan";
import { withSafeError } from "./withSafeError";
import { planRecipe } from "./planRecipe";
import { cancelMeal } from "./cancelMeal";
import { moveMeal } from "./moveMeal";

const allWithFn = (fn) => (obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]));

export const Mutation = {
  resolver: allWithFn(withSafeError)({
    createPlan,
    planRecipe,
    moveMeal,
    cancelMeal,
  }),
};
