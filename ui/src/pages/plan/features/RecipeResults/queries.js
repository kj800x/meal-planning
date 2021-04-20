import gql from "graphql-tag";

export const SEARCH_RECIPES = gql`
  query searchRecipes($query: String!) {
    searchRecipes(query: $query, limit: 50, offset: 0) {
      recipes {
        title
        description
        validServings
        id
        image
      }
    }
  }
`;
