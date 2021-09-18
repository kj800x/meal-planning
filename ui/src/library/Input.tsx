import { FC } from "react";

import styled from "styled-components";

const InputComponent = styled.input`
  padding: 0.5625rem 1.25rem;
  border-radius: 0.1875rem;
  box-shadow: inset 0 0 0 0.5px #7c98b6;
  font-size: 1rem;
  -webkit-transition: all 0.15s ease-in-out;
  transition: all 0.15s ease-in-out;
  background-color: #eaf2e0;
  border: 0px;
  border-radius: 0;
  display: block;
  line-height: 1.375rem;
  width: 100%;
  margin: 0;
  font-family: Lato, Helvetica, Arial, sans-serif;

  box-sizing: border-box;
`;

export const Input: FC<{ value: string; onChange: (value: string) => void }> =
  ({ value, onChange }) => (
    <InputComponent
      type="text"
      className="searchControl"
      autoComplete="off"
      spellCheck={false}
      autoFocus={true}
      placeholder="Log something..."
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
    />
  );
