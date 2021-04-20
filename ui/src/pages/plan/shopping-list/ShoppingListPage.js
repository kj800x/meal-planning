import { Header } from "../../../library/Header";
// import { MealPlan } from "../../home/MealPlan";
import { useParams } from "react-router";
import { Loading } from "../../../library/Loading";
import { ErrorDisplay } from "../../../library/ErrorDisplay";
import { IngredientsList } from "./IngredientsList";
import { PageWrapper } from "../../../library/PageWrapper";
import { Tabs } from "../Tabs";
import { usePlanWithIngredientsQuery } from "../../../generated/graphql";

export const ShoppingListPage = () => {
  const { id: planId } = useParams();
  const { data, loading, error } = usePlanWithIngredientsQuery({
    variables: {
      planId: parseInt(planId, 10),
    },
  });

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <PageWrapper>
        <Tabs planId={parseInt(planId, 10)} />
        <IngredientsList plan={data.mealPlan} />
      </PageWrapper>
    </>
  );
};
