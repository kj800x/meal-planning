import { FC } from "react";

import styled from "styled-components";

const SearchInputComponent = styled.input`
  padding: 0.2rem 0.8rem;
  border-radius: 2rem;
  box-shadow: inset 0 0 0 0.5px #7c98b6;
  font-size: 1rem;
  -webkit-transition: all 0.15s ease-in-out;
  transition: all 0.15s ease-in-out;
  background-color: #eaf2e0;
  border: 0px;
  display: block;
  line-height: 1.375rem;
  width: 100%;
  margin: 0;
  font-family: Lato, Helvetica, Arial, sans-serif;

  box-sizing: border-box;
`;

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <SearchInputComponent
    type="text"
    autoComplete="off"
    spellCheck={false}
    autoFocus={true}
    placeholder={placeholder}
    value={value}
    onChange={({ target: { value } }) => onChange(value)}
  />
);
