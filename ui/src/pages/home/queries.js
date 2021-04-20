import gql from "graphql-tag";

export const PLANS = gql`
  query plans {
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
          description
          validServings
          id
          image
        }
        date
      }
    }
  }
`;

export const CREATE_PLAN = gql`
  mutation createPlan {
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
