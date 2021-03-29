import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Loading } from "../../../library/Loading";
import { ErrorDisplay } from "../../../library/ErrorDisplay";
import { DatedPlan } from "./DatedPlan";
import { DatelessPlan } from "./DatelessPlan";
import { PlanHeader } from "./PlanHeader";

const Wrapper = styled.div`
  min-height: 200px;
  background: yellow;
`;
const ButtonWrapper = styled(Wrapper)`
  align-items: center;
  justify-content: center;
  display: flex;
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
        id
        type
        servings
        recipe {
          title
          image
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
        id
        type
        servings
        recipe {
          title
          image
        }
        date
      }
    }
  }
`;

export const MealPlan = ({ id: initialId = null }) => {
  const [enableDates, setEnableDates] = useState(false);
  const { data, loading, error } = useQuery(PLANS);
  const [createPlan] = useMutation(CREATE_PLAN);
  const [currentPlanId, setCurrentPlanId] = useState(initialId);
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
      <ButtonWrapper>
        <button onClick={createPlan}>Create Meal Plan</button>
      </ButtonWrapper>
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
      <PlanHeader
        mealPlan={mealPlan}
        setEnableDates={setEnableDates}
        enableDates={enableDates}
      />
      {enableDates ? (
        <DatedPlan plan={mealPlan} />
      ) : (
        <DatelessPlan plan={mealPlan} />
      )}
    </Wrapper>
  );
};
