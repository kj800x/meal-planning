import React from "react";
import { ExtraIngredient } from "./ExtraIngredient";
import { Grid, ColumnHeader } from "./Grid";
import { Placeholder } from "./Placeholder";
import { ScheduledMeal } from "./ScheduledMeal";
import { arrayOfSize, groupByType } from "./util";

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

const MealDate = ({ type, date, meals }) => {
  const filteredMeals = meals.filter(
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

const MealRow = ({ type, days, meals }) => {
  const unscheduledMeals = meals.filter(
    (meal) => meal.date == null && meal.type === type
  );

  return (
    <>
      <ColumnHeader>{type}</ColumnHeader>
      {days.map((day) => (
        <MealDate key={day} type={type} date={day} meals={meals} />
      ))}
      <div>
        {unscheduledMeals.map((meal) => (
          <ScheduledMeal key={meal.id} meal={meal} />
        ))}
      </div>
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

      <MealRow type="Breakfast" days={days} meals={plan.meals} />
      <MealRow type="Lunch" days={days} meals={plan.meals} />
      <MealRow type="Snack" days={days} meals={plan.meals} />
      <MealRow type="Dinner" days={days} meals={plan.meals} />

      {/* <div>
        {groupedPlan.breakfasts.map((meal) => (
          <ScheduledMeal meal={meal} key={meal.id} />
        ))}
        {arrayOfSize(groupedPlan.breakfastPlaceholders).map((i) => (
          <Placeholder key={i} />
        ))}
      </div>
      <div>
        {groupedPlan.lunches.map((meal) => (
          <ScheduledMeal meal={meal} key={meal.id} />
        ))}
        {arrayOfSize(groupedPlan.lunchPlaceholders).map((i) => (
          <Placeholder key={i} />
        ))}
      </div>
      <div>
        {groupedPlan.dinners.map((meal) => (
          <ScheduledMeal meal={meal} key={meal.id} />
        ))}
        {arrayOfSize(groupedPlan.dinnerPlaceholders).map((i) => (
          <Placeholder key={i} />
        ))}
      </div>
      <div>
        {groupedPlan.snacks.map((meal) => (
          <ScheduledMeal meal={meal} key={meal.id} />
        ))}
      </div>
      <div>
        {groupedPlan.extraIngredients.map((extra) => (
          <ExtraIngredient extra={extra} key={extra.id} />
        ))}
      </div> */}
    </Grid>
  );
};
