import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Switch } from "../../../library/Switch";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Loading } from "../../../library/Loading";
import { ErrorDisplay } from "../../../library/ErrorDisplay";
import { DatedPlan } from "./DatedPlan";
import { DatelessPlan } from "./DatelessPlan";

const Wrapper = styled.div`
  min-height: 200px;
  background: yellow;
`;

const Header = styled.div`
  display: flex;
  padding: 8px;
  align-items: space-between;
  justify-content: space-between;
  font-weight: 600;
  border-bottom: 2px solid blue;
`;

const PLANS = gql`
  query {
    mealPlans {
      id
      breakfastSlots
      lunchSlots
      dinnerSlots
      start
      end
      extraIngredients {
        quantity
        unit
        ingredient {
          name
        }
      }
      meals {
        type
        servings
        recipe {
          title
        }
        date
      }
    }
  }
`;

const CREATE_PLAN = gql`
  mutation {
    createPlan {
      id
      breakfastSlots
      lunchSlots
      dinnerSlots
      start
      end
      extraIngredients {
        quantity
        unit
        ingredient {
          name
        }
      }
      meals {
        type
        servings
        recipe {
          title
        }
        date
      }
    }
  }
`;

export const MealPlan = ({}) => {
  const [enableDates, setEnableDates] = useState(false);
  const { data, loading, error } = useQuery(PLANS);
  const [createPlan] = useMutation(CREATE_PLAN);
  const [currentPlanId, setCurrentPlanId] = useState(null);
  useEffect(() => {
    if (
      currentPlanId === null &&
      data &&
      data.mealPlan &&
      data.mealPlan.length > 0
    ) {
      setCurrentPlanId(data.mealPlan[0].id);
    }
  }, [currentPlanId, setCurrentPlanId, data]);

  if (loading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <ErrorDisplay error={error} />
      </Wrapper>
    );
  }

  if (data.mealPlans.length === 0) {
    return (
      <Wrapper
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <button onClick={createPlan}>Create Meal Plan</button>
      </Wrapper>
    );
  }

  const mealPlan =
    data.mealPlans.find((plan) => plan.id === currentPlanId) ||
    data.mealPlans[0];

  if (!mealPlan) {
    return null;
  }

  return (
    <Wrapper>
      <Header>
        <span>
          {new Date(mealPlan.start).toLocaleDateString("en-us", {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          -{" "}
          {new Date(mealPlan.end).toLocaleDateString("en-us", {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span>
          Use dates: <Switch enabled={enableDates} onChange={setEnableDates} />
        </span>
      </Header>
      {enableDates ? (
        <DatedPlan plan={mealPlan} />
      ) : (
        <DatelessPlan plan={mealPlan} />
      )}
    </Wrapper>
  );
};
