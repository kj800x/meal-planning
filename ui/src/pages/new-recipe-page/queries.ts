import gql from "graphql-tag";

export const CREATE_RECIPE = gql`
  mutation createRecipe($title: String!) {
    createRecipe(title: $title) {
      id
    }
  }
`;
