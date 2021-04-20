import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MealPlan, usePlansQuery } from "../../generated/graphql";
import { ErrorDisplay } from "../../library/ErrorDisplay";
import { FormattedDate } from "../../library/FormattedDate";
import { Loading } from "../../library/Loading";

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

const Tab = styled(NavLink)`
  display: block;
  padding: 6px;
  text-decoration: none;
  border: 2px solid black;
  border-bottom: none;
  margin: 8px 4px;
  margin-bottom: 0;
  border-radius: 8px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  color: black;

  &.active {
    color: blue;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const PlanInfoWrapper = styled.span`
  font-weight: 600;
`;

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

const PlanInfo: FC<{ planId: number }> = ({ planId }) => {
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
    <PlanInfoWrapper>
      Plan for <FormattedDate date={plan.start} format={DATE_FORMAT} /> -{" "}
      <FormattedDate date={plan.end} format={DATE_FORMAT} />
    </PlanInfoWrapper>
  );
};

export const Tabs: FC<{ planId: number }> = ({ planId }) => {
  return (
    <TabWrapper>
      <Tab to={`/plan/${planId}`}>Planned Meals</Tab>
      <Tab to={`/search/${planId}`}>Search</Tab>
      <Tab to={`/shopping-list/${planId}`}>Grocery List</Tab>
      {/* <Tab to={`/settings/${planId}`}>Settings</Tab> */}
      <Spacer />
      <PlanInfo planId={planId} />
    </TabWrapper>
  );
};
