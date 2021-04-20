import { FC } from "react";
import styled from "styled-components";
import {
  MealPlan as MealPlanType,
  useCreatePlanMutation,
  usePlansQuery,
} from "../../generated/graphql";
import { ErrorDisplay } from "../../library/ErrorDisplay";
import { Header } from "../../library/Header";
import { Loading } from "../../library/Loading";
import { PageWrapper } from "../../library/PageWrapper";
import { Link, useHistory } from "react-router-dom";
import { FormattedDate } from "../../library/FormattedDate";
import { PLANS } from "./queries";

const MealPlanWrapper = styled(Link)`
  display: flex;
  border: 3px solid blue;
  padding: 8px;
  color: black;
  text-decoration: none;
  margin: 8px;
  cursor: pointer;
  border-radius: 8px;
  text-align: center;

  h2 {
    margin: 0;
    display: block;
    width: 100%;
  }
`;

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

const MealPlan: FC<{ plan: MealPlanType }> = ({ plan }) => {
  return (
    <MealPlanWrapper to={`/plan/${plan.id}`}>
      <h2>
        <FormattedDate date={plan.start} format={DATE_FORMAT} />
        -
        <FormattedDate date={plan.end} format={DATE_FORMAT} />
      </h2>
    </MealPlanWrapper>
  );
};

const MealPlans = () => {
  const { data, loading, error } = usePlansQuery();
  const history = useHistory();
  const [createPlan] = useCreatePlanMutation({
    refetchQueries: [{ query: PLANS }],
    onCompleted: (data) => {
      history.push(`/plan/${data.createPlan.id}`);
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div>
      <MealPlanWrapper
        onClick={() => {
          createPlan();
        }}
        as="div"
      >
        <h2>Make a new plan</h2>
      </MealPlanWrapper>
      {data!.mealPlans.map((plan) => (
        <MealPlan plan={plan as MealPlanType} key={plan.id} />
      ))}
    </div>
  );
};

export const HomePage = () => {
  return (
    <>
      <Header />
      <PageWrapper>
        <MealPlans />
      </PageWrapper>
    </>
  );
};
