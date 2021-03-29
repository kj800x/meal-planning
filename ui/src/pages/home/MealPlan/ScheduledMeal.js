import { useMutation, gql } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDrag } from "react-dnd";

const CANCEL_MEAL = gql`
  mutation($mealId: Int!) {
    cancelMeal(mealId: $mealId) {
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

const MealWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px;
  border: 1px solid blue;
  margin: 4px;
`;

const MealImage = styled.img`
  max-height: 45px;
`;

const MealTitle = styled.div`
  font-weight: 600;
  font-size: 12px;
  flex: 1;
  margin: 0 2px;
`;
const MealCancel = styled.div`
  color: brown;
  margin: 2px;
  font-size: 12px;
  cursor: pointer;
`;

export const ScheduledMeal = ({ meal }) => {
  const [cancelMeal] = useMutation(CANCEL_MEAL, {
    variables: {
      mealId: meal.id,
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ScheduledMeal",
    item: () => ({ mealId: meal.id }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <MealWrapper ref={drag}>
      <MealImage src={`/meals/assets/${meal.recipe.image}`} />
      <MealTitle>
        {meal.recipe.title} for {meal.servings}
      </MealTitle>
      <MealCancel
        onClick={() => {
          cancelMeal();
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </MealCancel>
    </MealWrapper>
  );
};
