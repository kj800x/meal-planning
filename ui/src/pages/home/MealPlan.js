import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Switch } from "../../library/Switch";

const Wrapper = styled.div`
  min-height: 200px;
  background: yellow;
`;

const Header = styled.div`
  display: flex;
  padding: 2px;
  align-items: space-between;
  justify-content: space-between;
  font-weight: 600;
  border-bottom: 2px solid blue;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const ColumnHeader = styled.div`
  font-weight: 600;
  text-align: center;
`;

const MOCK_PLAN = {
  breakfastSlots: 4,
  lunchSlots: 5,
  dinnerSlots: 5,
  start: 985150800000,
  end: 985669200000,
  shoppingListExtra: [
    {
      amount: 1,
      unit: "unit",
      ingredient: {
        name: "Windex",
      },
    },
  ],
  meals: [
    {
      type: "Breakfast",
      servings: 2,
      recipe: {
        name: "Green Eggs and Ham",
      },
      date: 985150800000,
    },
    {
      type: "Lunch",
      servings: 2,
      recipe: {
        name: "Sweetgreen",
      },
      date: 985150800000,
    },
    {
      type: "Dinner",
      servings: 2,
      recipe: {
        name: "Chicken Picata",
      },
      date: 985150800000,
    },
    {
      type: "Snack",
      servings: 2,
      recipe: {
        name: "Chocolate",
      },
      date: 985150800000,
    },
    {
      type: "Snack",
      servings: 2,
      recipe: {
        name: "Strawberry Banana Smoothie",
      },
      date: 985237200000,
    },
  ],
};

const groupByType = (plan) => {
  const breakfasts = plan.meals.filter((meal) => meal.type === "Breakfast");
  const lunches = plan.meals.filter((meal) => meal.type === "Lunch");
  const dinners = plan.meals.filter((meal) => meal.type === "Dinner");
  const snacks = plan.meals.filter((meal) => meal.type === "Snack");

  return {
    ...plan,
    breakfasts,
    lunches,
    dinners,
    snacks,
    breakfastPlaceholders: Math.max(plan.breakfastSlots - breakfasts.length, 0),
    lunchPlaceholders: Math.max(plan.lunchSlots - lunches.length, 0),
    dinnerPlaceholders: Math.max(plan.dinnerSlots - dinners.length, 0),
  };
};

const arrayOfSize = (n) => {
  const o = [];
  for (var i = 0; i < n; i++) {
    o.push(i);
  }
  return o;
};

const renderMeal = (meal, i) => {
  return (
    <div key={i}>
      {meal.recipe.name} (serves {meal.servings})
    </div>
  );
};

const renderExtra = (extra, i) => {
  return (
    <div key={i}>
      {extra.ingredient.name} ({extra.amount} {extra.unit})
    </div>
  );
};

const renderPlaceholder = (i) => {
  return <div key={i}>----</div>;
};

const DatelessPlan = ({ plan = MOCK_PLAN }) => {
  const groupedPlan = groupByType(plan);

  return (
    <Grid columns={5}>
      <ColumnHeader>Breakfasts</ColumnHeader>
      <ColumnHeader>Lunches</ColumnHeader>
      <ColumnHeader>Dinners</ColumnHeader>
      <ColumnHeader>Snacks</ColumnHeader>
      <ColumnHeader>Extras</ColumnHeader>

      <div>
        {groupedPlan.breakfasts.map(renderMeal)}
        {arrayOfSize(groupedPlan.breakfastPlaceholders).map(renderPlaceholder)}
      </div>
      <div>
        {groupedPlan.lunches.map(renderMeal)}
        {arrayOfSize(groupedPlan.lunchPlaceholders).map(renderPlaceholder)}
      </div>
      <div>
        {groupedPlan.dinners.map(renderMeal)}
        {arrayOfSize(groupedPlan.dinnerPlaceholders).map(renderPlaceholder)}
      </div>
      <div>{groupedPlan.snacks.map(renderMeal)}</div>
      <div>{groupedPlan.shoppingListExtra.map(renderExtra)}</div>
    </Grid>
  );
};

const DatedPlan = () => {
  return null;
};

export const MealPlan = ({}) => {
  const [enableDates, setEnableDates] = useState(false);

  return (
    <Wrapper>
      <Header>
        <span>Week of March 21, 2021</span>
        <span>
          Use dates: <Switch enabled={enableDates} onChange={setEnableDates} />
        </span>
      </Header>
      {enableDates ? <DatedPlan /> : <DatelessPlan />}
    </Wrapper>
  );
};
