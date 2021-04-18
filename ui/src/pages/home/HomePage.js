import React, { useState } from "react";
import { Header } from "../../library/Header";
import { MealPlan } from "./MealPlan";
import { RecipeSearch } from "./RecipeSearch";
import { RecipeResults } from "./RecipeResults";

export const HomePage = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <Header />
      <MealPlan />
      <RecipeSearch value={query} onChange={setQuery} />
      <RecipeResults query={query} />
    </>
  );
};
