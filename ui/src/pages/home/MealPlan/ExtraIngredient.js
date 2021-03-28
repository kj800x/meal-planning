import React from "react";

export const ExtraIngredient = ({ extra }) => {
  return (
    <div>
      {extra.ingredient.name} ({extra.amount} {extra.unit})
    </div>
  );
};
