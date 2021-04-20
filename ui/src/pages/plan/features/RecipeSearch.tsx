import { FC } from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  padding: 0.5625rem 1.25rem;
  border-radius: 0.1875rem;
  box-shadow: inset 0 0 0 0.5px #7c98b6;
  font-size: 1rem;
  transition: all 0.15s ease-in-out;
  background-color: #f9fbfd;
  border: 0;
  border-bottom: 1px solid #d5d5d5;
  border-radius: 0;
  display: block;
  line-height: 1.375rem;
  width: 100%;
  margin: 0;
  font-family: Lato, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
`;

export const RecipeSearch: FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <SearchInput
      value={value}
      placeholder="What would you like to cook?"
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
