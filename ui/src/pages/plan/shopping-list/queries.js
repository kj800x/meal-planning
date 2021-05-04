import gql from "graphql-tag";

export const PLAN_WITH_INGREDIENTS = gql`
  query planWithIngredients($planId: Int!) {
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
        servings
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
