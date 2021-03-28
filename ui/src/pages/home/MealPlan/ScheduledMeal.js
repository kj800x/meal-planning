import React from "react";

export const ScheduledMeal = ({ meal }) => {
  return (
    <div>
      {meal.recipe.name} (serves {meal.servings})
    </div>
  );
};
