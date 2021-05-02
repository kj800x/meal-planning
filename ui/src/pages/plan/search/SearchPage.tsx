import { useState } from "react";
import { Header } from "../../../library/Header";
import { RecipeSearch } from "../features/RecipeSearch";
import { RecipeSearchResults } from "../features/RecipeResults";

import { Tabs } from "../Tabs";
import { useParams } from "react-router";
import { PageWrapper } from "../../../library/PageWrapper";
import { Loading } from "../../../library/Loading";
import { MealPlan, usePlansQuery } from "../../../generated/graphql";
import { ErrorDisplay } from "../../../library/ErrorDisplay";

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const { id: planId } = useParams<{ id: string }>();

  const { data, loading, error } = usePlansQuery();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  const plan: MealPlan = data!.mealPlans.find(
    (plan) => plan.id === parseInt(planId, 10)
  ) as MealPlan;

  return (
    <>
      <Header />
      <PageWrapper>
        <Tabs planId={parseInt(planId, 10)} />
        <RecipeSearch value={query} onChange={setQuery} />
        <RecipeSearchResults query={query} plan={plan} />
      </PageWrapper>
    </>
  );
};
