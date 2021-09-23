import { FC } from "react";
import styled from "styled-components";
import { RecipeDetailsQuery } from "../../generated/graphql";

const StepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
`;
const StepImageWrapper = styled.div`
  width: 300px;
  flex-shrink: 0;
  margin-right: 24px;
`;
const StepImage = styled.img`
  width: 100%;
  height: 100%;
`;
const StepNumber = styled.div`
  background: #7a7aff;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 9999px;
  font-size: 30px;
  font-weight: 600;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StepDescription = styled.div`
  flex: 1;

  padding: 8px 0;

  border-top: 1px solid black;
`;

export const Step: FC<{ step: RecipeDetailsQuery["recipe"]["steps"][0] }> = ({
  step,
}) => {
  return (
    <StepWrapper>
      <StepImageWrapper>
        <StepImage src={`/meals/assets/${step.image}`} />
      </StepImageWrapper>
      <StepNumber>{step.ordering + 1}</StepNumber>
      <StepDescription>{step.instructions}</StepDescription>
    </StepWrapper>
  );
};
