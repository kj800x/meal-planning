import React from "react";
import styled from "styled-components";

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ uncheckedColor }) => uncheckedColor};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: ${({ height }) => height / 2}px;
  }

  span:before {
    position: absolute;
    content: "";
    height: ${({ height, padding }) => height - 2 * padding}px;
    width: ${({ height, padding }) => height - 2 * padding}px;
    left: ${({ padding }) => padding}px;
    bottom: ${({ padding }) => padding}px;
    background-color: ${({ secondaryColor }) => secondaryColor};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: ${({ checkedColor }) => checkedColor};
  }

  input:focus + span {
    box-shadow: 0 0 1px ${({ checkedColor }) => checkedColor};
  }

  input:checked + span:before {
    transform: translateX(${({ height, width }) => width - height}px);
  }
`;

const Slider = styled.span``;

export const Switch = ({
  width = 35,
  height = 20,
  padding = 4,
  checkedColor = "#2196f3",
  uncheckedColor = "#ccc",
  secondaryColor = "white",
  enabled,
  onChange,
}) => {
  return (
    <Label
      width={width}
      height={height}
      padding={padding}
      checkedColor={checkedColor}
      uncheckedColor={uncheckedColor}
      secondaryColor={secondaryColor}
    >
      <input
        type="checkbox"
        checked={enabled}
        onChange={() => onChange((e) => !e)}
      />
      <Slider />
    </Label>
  );
};
