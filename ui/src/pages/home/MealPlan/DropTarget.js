import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PLAN_RECIPE = gql`
  mutation(
    $planId: Int!
    $recipeId: Int!
    $servings: Int!
    $type: String!
    $date: Date
  ) {
    planRecipe(
      planId: $planId
      recipeId: $recipeId
      servings: $servings
      type: $type
      date: $date
    ) {
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

const MOVE_MEAL = gql`
  mutation($mealId: Int!, $type: String!, $date: Date) {
    moveMeal(mealId: $mealId, type: $type, date: $date) {
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

export const DropTarget = ({ children, plan, type, date }) => {
  const [addPlannedRecipe] = useMutation(PLAN_RECIPE);
  const [moveMeal] = useMutation(MOVE_MEAL);

  const [{ isOver }, drop] = useDrop({
    accept: ["Yield", "ScheduledMeal"],
    drop: (item, monitor) => {
      switch (monitor.getItemType()) {
        case "Yield":
          console.log({ item, plan, type, date });
          addPlannedRecipe({
            variables: {
              planId: plan.id,
              servings: item.servings,
              recipeId: item.recipeId,
              type: type,
              date: date,
            },
          });
          return;
        case "ScheduledMeal":
          moveMeal({
            variables: {
              mealId: item.mealId,
              type: type,
              date: date,
            },
          });
          return;
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Wrapper ref={drop} isOver={isOver}>
      {children}
    </Wrapper>
  );
};
