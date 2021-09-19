import gql from "graphql-tag";

export const RECIPE_DETAILS = gql`
  query recipeDetails($id: Int!) {
    recipe(id: $id) {
      id
      source
      title
      time
      image
      description
      pdf
      url
      rating

      cuisines {
        id
        image
        name
      }
      allergens {
        id
        image
        name
      }
      nutritionFacts {
        id
        name
        amount
        unit
      }
      utensils {
        id
        name
      }
      steps {
        id
        ordering
        image
        instructions
      }
      allServingIngredients {
        id
        servings
        quantity
        unit
        ingredient {
          id
          name
          image
          groceryAisle {
            id
            name
            ordering
          }
        }
      }
      validServings
    }
  }
`;
