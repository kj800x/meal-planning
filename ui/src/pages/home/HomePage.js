import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../../library/Header";
import { MealPlan } from "./MealPlan";
import { RecipeSearch } from "./RecipeSearch";
import { RecipeResults } from "./RecipeResults";

const Wrapper = styled.div`
  max-width: 1600px;
  margin: 12px auto;
  background: lightblue;
`;

export const HomePage = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <Header />
      <Wrapper>
        <MealPlan />
        <RecipeSearch value={query} onChange={setQuery} />
        <RecipeResults query={query} />
      </Wrapper>
    </>
  );
};
