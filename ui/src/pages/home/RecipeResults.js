import React from "react";
import { useQuery } from "@apollo/client";
import { Loading } from "../../library/Loading";
import { ErrorDisplay } from "../../library/ErrorDisplay";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { useDrag } from "react-dnd";

const SEARCH_RECIPES = gql`
  query($query: String!) {
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

const RecipeWrapper = styled.div`
  height: 140px;
  display: flex;
  flex-direction: row;
  padding: 4px;
`;

const RecipeImage = styled.img``;

const RecipeContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;
const RecipeDescription = styled.p`
  font-weight: 400;
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
`;
const RecipeTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin: 0 0 8px;
`;
const Servings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const ValidServingWrapper = styled.div`
  border: 1px solid black;
  padding: 2px 4px;
  margin: 8px 4px;
  border-radius: 8px;
  background: lightgreen;
  &:before {
    content: "Serves ";
  }
`;

const ValidServing = ({ serving, recipe }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "Yield",
    item: () => ({ recipeId: recipe.id, servings: serving }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <ValidServingWrapper ref={drag} isDragging={isDragging}>
      {serving}
    </ValidServingWrapper>
  );
};

const Recipe = ({ recipe }) => {
  return (
    <RecipeWrapper>
      <RecipeImage src={`/meals/assets/${recipe.image}`} />
      <RecipeContent>
        <RecipeTitle>{recipe.title}</RecipeTitle>
        <RecipeDescription>{recipe.description}</RecipeDescription>
        <Servings>
          {recipe.validServings.map((serving) => (
            <ValidServing key={serving} serving={serving} recipe={recipe} />
          ))}
        </Servings>
      </RecipeContent>
    </RecipeWrapper>
  );
};

export const RecipeResults = ({ query }) => {
  const { data, loading, error } = useQuery(SEARCH_RECIPES, {
    variables: { query },
  });

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (loading) {
    return <Loading color="red" />;
  }

  return (
    <div>
      {data.searchRecipes.recipes.map((recipe) => (
        <Recipe key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};
