import { MealPlanDataObject } from "../data-objects/MealPlan";
import { db } from "../db";
import { MutationFunction } from "./types";

const makeNew = db.prepare(
  "INSERT INTO MealPlan (breakfastSlots, lunchSlots, dinnerSlots, start, end) VALUES (?, ?, ?, ?, ?)"
);

function getStartOfWeek(initialDate: Date) {
  const date = new Date(initialDate);
  date.setDate(date.getDate() - date.getDay());
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}
function getEndOfWeek(initialDate: Date) {
  const date = getStartOfWeek(initialDate);
  date.setDate(date.getDate() + 7);
  return date;
}

export const createPlan: MutationFunction<{}, MealPlanDataObject> = (
  _,
  __,
  context
) => {
  const now = new Date();
  const id = makeNew.run(
    5,
    5,
    5,
    getStartOfWeek(now).getTime(),
    getEndOfWeek(now).getTime()
  ).lastInsertRowid;

  return context.loaders.MealPlan.load(id as number);
};
