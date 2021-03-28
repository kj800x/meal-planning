import React from "react";
import { ExtraIngredient } from "./ExtraIngredient";
import { Grid, ColumnHeader } from "./Grid";
import { Placeholder } from "./Placeholder";
import { ScheduledMeal } from "./ScheduledMeal";
import { arrayOfSize, groupByType } from "./util";

export const DatelessPlan = ({ plan }) => {
  const groupedPlan = groupByType(plan);

  return (
    <Grid columns={5}>
      <ColumnHeader>Breakfasts</ColumnHeader>
      <ColumnHeader>Lunches</ColumnHeader>
      <ColumnHeader>Dinners</ColumnHeader>
      <ColumnHeader>Snacks</ColumnHeader>
      <ColumnHeader>Extras</ColumnHeader>

      <div>
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
      </div>
    </Grid>
  );
};
