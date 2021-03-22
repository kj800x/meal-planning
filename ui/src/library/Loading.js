import React, { useState, useCallback } from "react";
import Loader from "react-loaders";
import { useDelayedEffect } from "./hooks/useDelayedEffect";
import styled from "styled-components";

import "loaders.css/loaders.min.css";

const LoaderContainer = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  .ball-grid-pulse > div,
  .ball-spin-fade-loader > div {
    background-color: ${({ color }) => color};
  }
`;

export const Loading = ({ color = "blue" }) => {
  const [show, setShow] = useState(false);

  const activate = useCallback(() => {
    setShow(true);
  }, [setShow]);

  useDelayedEffect(activate, 100);

  if (!show) {
    return null;
  }

  return (
    <LoaderContainer color={color}>
      <Loader type="ball-grid-pulse" />
    </LoaderContainer>
  );
};
