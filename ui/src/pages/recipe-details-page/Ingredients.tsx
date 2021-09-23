import { FC } from "react";
import { RecipeDetailsQuery } from "../../generated/graphql";
import styled from "styled-components";

const SectionHeader = styled.h2`
  margin: 4px 0;
`;

const IngredientsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 8px;
`;
const IngredientWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const PhotoWrapper = styled.div``;
const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 9999999px;
`;
const DetailsWrapper = styled.div`
  display: flex;
  margin-left: 16px;
  flex-direction: column;
`;
const Quantity = styled.div`
  margin-top: 8px;
  font-size: 1em;
`;
const Name = styled.div`
  font-weight: 600;
  font-size: 1.2em;
`;

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
                <Name>{yld.ingredient.name}</Name>
                {yld.unit !== "UNITLESS" && (
                  <Quantity>
                    {yld.quantity} {yld.unit}
                  </Quantity>
                )}
              </DetailsWrapper>
            </IngredientWrapper>
          );
        })}
      </IngredientsWrapper>
    </>
  );
};
