import React from "react";
import styled from "styled-components";

const collect = (collector) => (array) => {
  const out = {};
  for (const elem of array) {
    if (!out[collector(elem)]) {
      out[collector(elem)] = [];
    }
    out[collector(elem)].push(elem);
  }
  return out;
};

// const collect = (collector) => (array) =>
//   array.reduce((acc, value) => {
//     const key = collector(value);
//     if (!acc[key]) {
//       acc[key] = [];
//     }
//     acc[key].push(value);
//   }, {});

const reduceEntries = (entries) => {
  const output = {};
  for (const entry of entries) {
    if (!output[entry.unit]) {
      output[entry.unit] = { ...entry };
    } else {
      output[entry.unit].quantity += entry.quantity;
    }
  }
  return Object.values(output);
};

const Wrapper = styled.div``;
const GroupWrapper = styled.div``;
const GroupHeader = styled.h2``;
const IngredientWrapper = styled.div``;
const IngredientName = styled.span``;

const Ingredient = ({ entries }) => {
  const simplifiedEntries = reduceEntries(entries);

  return (
    <IngredientWrapper>
      <IngredientName>{entries[0].ingredient.name}</IngredientName>
      {simplifiedEntries.map((entry, i) => {
        if (entry.unit === "UNITLESS") {
          return null;
        }

        return (
          <span key={i}>
            {entry.quantity} {entry.unit}
          </span>
        );
      })}
    </IngredientWrapper>
  );
};

const IngredientGroups = ({ group, groupedIngredients }) => {
  const aisle = groupedIngredients[group][0].ingredient.groceryAisle || {
    name: "Unknown",
  };

  const accumulateIngredients = collect((y) => y.ingredient.id)(
    groupedIngredients[group]
  );

  return (
    <GroupWrapper>
      <GroupHeader>{aisle.name} Aisle</GroupHeader>
      {Object.keys(accumulateIngredients).map((key) => (
        <Ingredient entries={accumulateIngredients[key]} key={key} />
      ))}
    </GroupWrapper>
  );
};

export const IngredientsList = ({ plan }) => {
  const allIngredients = plan.meals.flatMap((meal) => meal.ingredients);
  const groupedIngredients = collect(
    (i) => (i.groceryAisle && i.groceryAisle.id) || -1
  )(allIngredients);

  return (
    <Wrapper>
      {Object.keys(groupedIngredients).map((group) => (
        <IngredientGroups
          group={group}
          key={group}
          groupedIngredients={groupedIngredients}
        />
      ))}
    </Wrapper>
  );
};
