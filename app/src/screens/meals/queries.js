import gql from 'graphql-tag';

export const PLAN_BY_DATE = gql`
  query planByDate($date: Date!) {
    planByDate(date: $date) {
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
          description
        }
      }
    }
  }
`;
