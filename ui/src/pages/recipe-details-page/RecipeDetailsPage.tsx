import { FC } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  RecipeDetailsQuery,
  useRecipeDetailsQuery,
} from "../../generated/graphql";
import { ErrorDisplay } from "../../library/ErrorDisplay";
import { Loading } from "../../library/Loading";

const Wrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  margin: 0;
  margin-bottom: 8px;
  text-align: center;
  border-bottom: 1px solid black;
  width: 200px;
  align-self: center;
`;

const Hero = styled.div``;

const Image = styled.img``;

const Title = styled.div``;

const PrimaryDetails = styled.div``;

const TitleBlock = styled.div``;

const Description = styled.div``;
const Cuisines = styled.div``;
const Allergens = styled.div``;
const PrimaryLeft = styled.div``;
const PrimaryRight = styled.div``;
const Time = styled.div``;
const Rating = styled.div``;
const Label = styled.span`
  font-weight: 600;
`;

// Compare with https://www.hellofresh.com/recipes/15-09-594148b52310a816313c5172
const RecipeDetails: FC<{ recipe: RecipeDetailsQuery["recipe"] }> = ({
  recipe,
}) => {
  return (
    <Wrapper>
      <Hero>
        <Image />
      </Hero>
      <TitleBlock>
        <Title>{recipe.title}</Title>
      </TitleBlock>
      <PrimaryDetails>
        <PrimaryLeft>
          <Description>{recipe.description}</Description>
          <Cuisines>
            <Label>Cuisines:</Label>
            {recipe.cuisines.map((cusine) => (
              <span key={cusine.id}>{cusine.name}</span>
            ))}
          </Cuisines>
          <Allergens>
            <Label>Allergens:</Label>
            {recipe.allergens.map((allergen) => (
              <span key={allergen.id}>{allergen.name}</span>
            ))}
          </Allergens>
        </PrimaryLeft>
        <PrimaryRight>
          <Time>
            <Label>Total Time:</Label>
            {recipe.time}
          </Time>
          <Rating>
            <Label>Rating:</Label>
            {recipe.rating}
          </Rating>
        </PrimaryRight>
        <HBlock>
          <PrimaryLeft>
            <SectionHeader>Ingredients</SectionHeader>
            {}
          </PrimaryLeft>
          <PrimaryRight>
            <SectionHeader>Nutrition Values</SectionHeader>
          </PrimaryRight>
        </HBlock>
        <HBlock>
          <SectionHeader>Utensils</SectionHeader>
        </HBlock>
      </PrimaryDetails>
    </Wrapper>
  );
};

export const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useRecipeDetailsQuery({
    variables: {
      id: parseInt(id, 10),
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return <RecipeDetails recipe={data?.recipe!} />;
};
