import { FC } from "react";

import styled from "styled-components";

const ButtonComponent = styled.button`
  padding: 0.2rem 0.8rem;
  border-radius: 2rem;
  font-size: 1rem;

  &:hover {
    background-color: #e24444;
  }
`;

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, disabled, onClick }) => (
  <ButtonComponent disabled={disabled} onClick={onClick}>
    {children}
  </ButtonComponent>
);
