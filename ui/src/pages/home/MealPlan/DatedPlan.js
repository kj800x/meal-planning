import React from "react";
import { Grid, ColumnHeader } from "./Grid";
import { Placeholder } from "./Placeholder";
import { ScheduledMeal } from "./ScheduledMeal";
import { DropTarget } from "./DropTarget";

const getDays = ({ start, end }) => {
  const days = [];
  let current = start;
  while (current < end) {
    days.push(current);
    const d = new Date(current);
    d.setDate(d.getDate() + 1);
    current = d.getTime();
  }
  return days;
};

const MealDate = ({ type, date, plan }) => {
  const filteredMeals = plan.meals.filter(
    (meal) => meal.date === date && meal.type === type
  );

  if (filteredMeals.length === 0) {
    return (
      <div>
        <Placeholder />
      </div>
    );
  }

  return (
    <div>
      {filteredMeals.map((meal) => (
        <ScheduledMeal key={meal.id} meal={meal} />
      ))}
    </div>
  );
};

const MealRow = ({ type, days, plan }) => {
  const unscheduledMeals = plan.meals.filter(
    (meal) => meal.date == null && meal.type === type
  );

  return (
    <>
      <ColumnHeader>{type}</ColumnHeader>
      {days.map((day) => (
        <DropTarget key={day} plan={plan} type={type} date={day}>
          <MealDate type={type} date={day} plan={plan} />
        </DropTarget>
      ))}
      <DropTarget plan={plan} type={type} date={null}>
        {unscheduledMeals.map((meal) => (
          <ScheduledMeal key={meal.id} meal={meal} />
        ))}
      </DropTarget>
    </>
  );
};

const DatedHeader = ({ days }) => {
  return (
    <>
      <ColumnHeader></ColumnHeader>
      {days.map((day) => {
        return (
          <ColumnHeader key={day}>
            {new Date(day).toLocaleDateString("en-us", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </ColumnHeader>
        );
      })}
      <ColumnHeader>Unscheduled</ColumnHeader>
    </>
  );
};

export const DatedPlan = ({ plan }) => {
  const days = getDays(plan);

  return (
    <Grid columns={days.length + 2}>
      <DatedHeader days={days} />

      <MealRow type="Breakfast" days={days} plan={plan} />
      <MealRow type="Lunch" days={days} plan={plan} />
      <MealRow type="Snack" days={days} plan={plan} />
      <MealRow type="Dinner" days={days} plan={plan} />
    </Grid>
  );
};
