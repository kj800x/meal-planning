import { FC } from "react";
import { RecipeDetailsQuery } from "../../generated/graphql";
import styled from "styled-components";

const SectionHeader = styled.h2`
  margin: 4px 0;
`;

const IngredientsWrapper = styled.div``;
const IngredientWrapper = styled.div``;
const PhotoWrapper = styled.div``;
const Image = styled.img``;
const DetailsWrapper = styled.div``;
const Quantity = styled.div``;
const Name = styled.div``;

export const Ingredients: FC<{ recipe: RecipeDetailsQuery["recipe"] }> = ({
  recipe,
}) => {
  const ids = recipe.allServingIngredients.map((e) => e.id);
  const allUniqueIngredients = recipe.allServingIngredients.filter(
    (e, i, a) => ids.indexOf(e.id) === i
  );

  return (
    <>
      <SectionHeader>Ingredients</SectionHeader>
      <IngredientsWrapper>
        {allUniqueIngredients.map((yld) => {
          return (
            <IngredientWrapper>
              <PhotoWrapper>
                <Image src={`/meals/assets/${yld.ingredient.image}`} />
              </PhotoWrapper>
              <DetailsWrapper>
                <Quantity>
                  {yld.quantity} {yld.unit}
                </Quantity>
                <Name>{yld.ingredient.name}</Name>
              </DetailsWrapper>
            </IngredientWrapper>
          );
        })}
      </IngredientsWrapper>
    </>
  );
};
