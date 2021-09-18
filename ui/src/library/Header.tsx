import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  border-radius: 0.5875rem 0.5875rem 0 0;
  padding: 1.5rem;
  background: linear-gradient(#609848, #98c068);

  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Icon = styled.div`
  height: 100px;
  width: 100px;

  & > svg {
    width: 100%;
    height: 100%;
    font-size: 75px;
    color: #287028;
  }
`;
export const Header = () => {
  return (
    <HeaderWrapper>
      <Icon>
        <FontAwesomeIcon icon={faLeaf} />
      </Icon>
    </HeaderWrapper>
  );
};
