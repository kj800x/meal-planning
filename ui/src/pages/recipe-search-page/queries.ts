import gql from "graphql-tag";

export const RECIPE_SEARCH = gql`
  query recipeSearch($query: String!) {
    searchRecipes(query: $query, limit: 25, offset: 0) {
      recipes {
        id
        title
        time
        validServings
        description
        image
      }
      total
    }
  }
`;
