import gql from 'graphql-tag';

export const COOKBOOK_RECIPES = gql`
  query cookbookRecipes($query: String!) {
    searchRecipes(query: $query) {
      total
      recipes {
        id
        cuisines {
          id
          name
        }
        allergens {
          id
          name
        }
        validServings
        title
        time
        image
        description
        url
        rating
      }
    }
  }
`;
