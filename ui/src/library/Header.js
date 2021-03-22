import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  h1 {
    margin: 0;
    color: white;
  }

  background: #717171;
  border-bottom: 1px solid black;
`;

export const Header = () => {
  return (
    <Wrapper>
      <h1>Meal Planning</h1>
    </Wrapper>
  );
};
