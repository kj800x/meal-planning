import React from "react";

import styled from "styled-components";

const ErrorContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ErrorBox = styled.div`
  border: 1px solid #820000;
  width: 50%;
  margin-top: 24px;
  color: white;
  margin-bottom: 24px;
`;
const ErrorBoxHeader = styled.div`
  border-bottom: 1px solid #820000;
  background: black;
  text-align: center;
  padding: 8px;
`;
const ErrorBoxContent = styled.pre`
  background: #1c0000;
  padding: 24px;
  margin: 0;
  text-wrap: wrap;
  white-space: pre-line;
`;

export const ErrorDisplay = ({ error = new Error() }) => (
  <ErrorContainer>
    <h2>Sorry, there was an error.</h2>
    <ErrorBox>
      <ErrorBoxHeader>Maybe this helps?</ErrorBoxHeader>
      <ErrorBoxContent>{error.toString()}</ErrorBoxContent>
    </ErrorBox>
  </ErrorContainer>
);
