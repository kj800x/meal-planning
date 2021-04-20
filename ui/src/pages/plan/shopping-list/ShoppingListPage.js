import React from "react";
import styled from "styled-components";
import { Header } from "../../../library/Header";
// import { MealPlan } from "../../home/MealPlan";
import { useParams } from "react-router";
import { useQuery, gql } from "@apollo/client";
import { Loading } from "../../../library/Loading";
import { ErrorDisplay } from "../../../library/ErrorDisplay";
import { IngredientsList } from "./IngredientsList";

const PLAN_WITH_INGREDIENTS = gql`
  query($planId: Int!) {
    mealPlan(id: $planId) {
      id
      breakfastSlots
      lunchSlots
      dinnerSlots
      start
      end
      extraIngredients {
        id
        unit
        quantity
        ingredient {
          id
          name
          image
          groceryAisle {
            name
            ordering
            id
          }
        }
      }
      meals {
        id
        type
        servings
        date
        ingredients {
          id
          servings
          ingredient {
            id
            name
            image
            groceryAisle {
              name
              ordering
              id
            }
          }
          quantity
          unit
        }
        recipe {
          title
          image
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  max-width: 1600px;
  margin: 12px auto;
  background: lightblue;
`;

export const ShoppingListPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(PLAN_WITH_INGREDIENTS, {
    variables: {
      planId: parseInt(id, 10),
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
      <Wrapper>
        {/* <MealPlan id={id} /> */}
        <IngredientsList plan={data.mealPlan} />
      </Wrapper>
    </>
  );
};
