import { FC, useState } from "react";
import { RecipeDetailsQuery } from "../../generated/graphql";
import styled from "styled-components";
import formatQuantity from "format-quantity";

const SectionHeader = styled.h2`
  margin: 4px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const ServingControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const ServingControlOption = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  border: 1px solid black;

  cursor: pointer;

  background: #9e9eff;

  ${({ active }) => (active ? "background: #7171e2" : "")};

  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-right: none;
    margin-left: 8px;
  }

  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-right: 1px solid black;
  }
`;

const ServingControls: FC<{
  servings: number;
  validServings: number[];
  setServings: (value: number) => void;
}> = ({ servings, validServings, setServings }) => {
  if (validServings.length === 0) {
    return null;
  }

  return (
    <ServingControlWrapper>
      Servings:
      {validServings.map((option) => {
        return (
          <ServingControlOption
            active={option === servings}
            key={option}
            onClick={setServings.bind(null, option)}
          >
            {option}
          </ServingControlOption>
        );
      })}
    </ServingControlWrapper>
  );
};

export const Ingredients: FC<{ recipe: RecipeDetailsQuery["recipe"] }> = ({
  recipe,
}) => {
  const [servings, setServings] = useState<number>(
    recipe.validServings.length > 0 ? recipe.validServings[0] : 1
  );

  return (
    <>
      <SectionHeader>
        <span>Ingredients</span>
        <ServingControls
          servings={servings}
          setServings={setServings}
          validServings={recipe.validServings}
        />
      </SectionHeader>

      <IngredientsWrapper>
        {recipe.allServingIngredients
          .filter((yld) => yld.servings === servings)
          .map((yld) => {
            return (
              <IngredientWrapper>
                <PhotoWrapper>
                  <Image src={`/meals/assets/${yld.ingredient.image}`} />
                </PhotoWrapper>
                <DetailsWrapper>
                  <Name>{yld.ingredient.name}</Name>
                  {yld.unit !== "UNITLESS" && (
                    <Quantity>
                      {formatQuantity(yld.quantity, true)} {yld.unit}
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
