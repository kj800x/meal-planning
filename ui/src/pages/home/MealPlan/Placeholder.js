import React from "react";
import styled from "styled-components";

const PlaceholderWrapper = styled.div`
  margin: 4px;
  border: 1px dashed gray;
  padding: 2px;
  text-align: center;
  height: 16px;
`;

export const Placeholder = () => {
  return <PlaceholderWrapper />;
};
