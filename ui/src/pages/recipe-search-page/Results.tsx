import { FC } from "react";
import {
  RecipeSearchQuery,
  useRecipeSearchQuery,
} from "../../generated/graphql";
import { ErrorDisplay } from "../../library/ErrorDisplay";
import { Loading } from "../../library/Loading";
import { NoResults } from "./NoResults";

import styled from "styled-components";
import { Link } from "react-router-dom";

const RecipeSearchResultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 200px;
  margin: 16px;

  text-decoration: none;
`;
const RecipeImage = styled.img`
  width: 300px;
  object-fit: cover;
`;
const RecipeText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 16px;
`;
const RecipeTitle = styled.h3`
  margin-top: 0;

  a {
    text-decoration: none;
  }
`;
const RecipeDescription = styled.div``;

const RecipeSearchResult: FC<{
  recipe: RecipeSearchQuery["searchRecipes"]["recipes"][0];
}> = ({ recipe }) => {
  return (
    <RecipeSearchResultWrapper>
      <RecipeImage src={`/meals/assets/${recipe.image}`} />
      <RecipeText>
        <RecipeTitle>
          <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
        </RecipeTitle>
        <RecipeDescription>{recipe.description}</RecipeDescription>
      </RecipeText>
    </RecipeSearchResultWrapper>
  );
};

export const Results: FC<{
  query: string;
}> = ({ query }) => {
  const { data, loading, error } = useRecipeSearchQuery({
    variables: { query },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (data?.searchRecipes.total === 0) {
    return <NoResults />;
  }

  return (
    <div>
      {data?.searchRecipes.recipes.map((recipe) => (
        <RecipeSearchResult recipe={recipe} key={recipe.id} />
      ))}
    </div>
  );
};
