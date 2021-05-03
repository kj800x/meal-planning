import React, { FC } from 'react';
import styled from 'styled-components/native';

const ErrorContainer = styled.View`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ErrorBox = styled.View`
  border: 1px solid #820000;
  width: 80%;
  margin-top: 24px;
  margin-bottom: 24px;
`;
const ErrorBoxHeader = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #820000;
  text-align: center;
  padding: 8px;
`;
const ErrorBoxContent = styled.View`
  padding: 24px;
  margin: 0;
`;

const HeaderText = styled.Text`
  font-weight: 600;
  font-size: 24px;
`;

const ErrorBoxHeaderText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

const ErrorBoxContentText = styled.Text`
  font-size: 14px;
  font-family: monospace;
`;

export const ErrorDisplay: FC<{ error: Error }> = ({ error }) => {
  return (
    <ErrorContainer>
      <HeaderText>Oh no! There's been an error</HeaderText>
      <ErrorBox>
        <ErrorBoxHeader>
          <ErrorBoxHeaderText>Maybe this helps?</ErrorBoxHeaderText>
        </ErrorBoxHeader>
        <ErrorBoxContent>
          <ErrorBoxContentText>{error.toString()}</ErrorBoxContentText>
        </ErrorBoxContent>
      </ErrorBox>
    </ErrorContainer>
  );
};
