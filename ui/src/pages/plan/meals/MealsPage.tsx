import { useState } from "react";
import { Header } from "../../../library/Header";
import { RecipeSearch } from "../features/RecipeSearch";
import { RecipeResults } from "../features/RecipeResults";

import { Tabs } from "../Tabs";
import { useParams } from "react-router";
import { PageWrapper } from "../../../library/PageWrapper";
import { MealPlan, usePlansQuery } from "../../../generated/graphql";
import { ErrorDisplay } from "../../../library/ErrorDisplay";
import { Loading } from "../../../library/Loading";

export const MealsPage = () => {
  const { id } = useParams<{ id: string }>();
  const planId = parseInt(id, 10);

  const { data, loading, error } = usePlansQuery();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  const plan: MealPlan = data!.mealPlans.find(
    (plan) => plan.id === planId
  ) as MealPlan;

  return (
    <>
      <Header />
      <PageWrapper>
        <Tabs planId={planId} />
        <RecipeResults
          recipes={plan.meals.map((meal) => meal.recipe)}
          plan={plan}
        />
      </PageWrapper>
    </>
  );
};
