import { createPlan } from "./createPlan";
import { withSafeError } from "./withSafeError";

const allWithFn = (fn) => (obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]));

export const Mutation = {
  resolver: allWithFn(withSafeError)({
    createPlan,
  }),
};
