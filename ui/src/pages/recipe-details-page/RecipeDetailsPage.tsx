import { FC } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  RecipeDetailsQuery,
  useRecipeDetailsQuery,
} from "../../generated/graphql";
import { ErrorDisplay } from "../../library/ErrorDisplay";
import { Loading } from "../../library/Loading";
import { Step } from "./Step";
import { Ingredients } from "./Ingredients";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hero = styled.div`
  width: 100%;
  max-height: 400px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const TitleBlock = styled.div`
  padding: 8px;
  width: 65%;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 3em;
  line-height: 1.4em;
`;

const HBlock = styled.div`
  display: flex;
  flex-direction: row;
`;
const LeftBlock = styled.div`
  flex: 2;
  padding: 8px;
  border: 1px solid black;
  border-radius: 8px;
  margin: 8px;
`;
const RightBlock = styled.div`
  flex: 1;
  padding: 8px;
  border: 1px solid black;
  border-radius: 8px;
  margin: 8px;
`;

const Description = styled.div``;
const Cuisines = styled.ul`
  margin: 16px 0;
  display: flex;
  padding: 0;
`;
const Cuisine = styled.li`
  list-style: none;
  margin-right: 4px;

  &::after {
    content: ",";
  }

  &:last-child::after {
    content: "";
  }
`;
const Allergens = styled.ul`
  margin: 16px 0 0;
  display: flex;
  padding: 0;
`;
const Allergen = styled.li`
  list-style: none;
  margin-right: 4px;

  &::after {
    content: ",";
  }

  &:last-child::after {
    content: "";
  }
`;
const Utensils = styled.ul`
  margin: 16px 0 0;
  display: flex;
  padding: 0;
`;
const Utensil = styled.li`
  list-style: none;
  margin-right: 4px;

  &::after {
    content: ",";
  }

  &:last-child::after {
    content: "";
  }
`;
const Time = styled.div`
  margin: 0 0 16px;
`;
const Rating = styled.div`
  margin: 16px 0;
`;
const Label = styled.span`
  font-weight: 600;
  margin-right: 8px;
`;

const SectionHeader = styled.h2`
  margin: 4px 0;
`;

const SubHeader = styled.span`
  float: right;
  font-size: 0.5em;
  font-weight: 500;
  vertical-align: text-bottom;
  position: relative;
  top: 8px;
`;
const NutritionValueWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;

  grid-gap: 8px;
`;

const Steps = styled.div``;

const FactWrapper = styled.div`
  display: contents;

  dd {
    justify-self: flex-end;
  }
`;

// Compare with https://www.hellofresh.com/recipes/15-09-594148b52310a816313c5172
const RecipeDetails: FC<{ recipe: RecipeDetailsQuery["recipe"] }> = ({
  recipe,
}) => {
  return (
    <Wrapper>
      <Hero>
        <Image src={`/meals/assets/${recipe.image}`} />
      </Hero>
      <TitleBlock>
        <Title>{recipe.title}</Title>
      </TitleBlock>
      <HBlock>
        <LeftBlock>
          <Description>{recipe.description}</Description>
          <Cuisines>
            <Label>Cuisines:</Label>
            {recipe.cuisines.map((cusine) => (
              <Cuisine key={cusine.id}>{cusine.name}</Cuisine>
            ))}
          </Cuisines>
          <Allergens>
            <Label>Allergens:</Label>
            {recipe.allergens.map((allergen) => (
              <Allergen key={allergen.id}>{allergen.name}</Allergen>
            ))}
          </Allergens>
        </LeftBlock>
        <RightBlock>
          <Time>
            <Label>Total Time:</Label>
            {recipe.time}
          </Time>
          <Rating>
            <Label>Rating:</Label>
            {recipe.rating}
          </Rating>
        </RightBlock>
      </HBlock>
      <HBlock>
        <LeftBlock>
          <Ingredients recipe={recipe} />
        </LeftBlock>
        <RightBlock>
          <SectionHeader>
            Nutrition Values
            <SubHeader>/ per Serving</SubHeader>
          </SectionHeader>

          <NutritionValueWrapper>
            {recipe.nutritionFacts.map((fact) => (
              <FactWrapper key={fact.id}>
                <dt>
                  <Label>{fact.name}</Label>
                </dt>
                <dd>
                  {fact.amount} {fact.unit}
                </dd>
              </FactWrapper>
            ))}
          </NutritionValueWrapper>
        </RightBlock>
      </HBlock>
      <HBlock>
        <LeftBlock>
          <SectionHeader>Utensils</SectionHeader>
          <Utensils>
            {recipe.utensils.map((utensil) => (
              <Utensil key={utensil.id}>{utensil.name}</Utensil>
            ))}
          </Utensils>
        </LeftBlock>
      </HBlock>
      <HBlock>
        <LeftBlock>
          <SectionHeader>Steps</SectionHeader>
          <Steps>
            {recipe.steps.map((step) => (
              <Step key={step.id} step={step} />
            ))}
          </Steps>
        </LeftBlock>
      </HBlock>
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
