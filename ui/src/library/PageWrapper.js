import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCog,
  faHeart,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";

const RootWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
`;

const LeftNavbarWrapper = styled.div`
  width: 300px;
  padding-left: 72px;
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 32px;
  }
`;

export const Right = styled.div`
  flex: 1;
`;

export const Center = styled.div`
  flex: 3;
  background: var(--GYPSUM);
`;

const Logo = styled.h1`
  color: var(--LOGO);
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 24px;
  color: var(--NAV_DISABLED);

  & > svg {
    margin-right: 12px;
    width: 1.5em !important;
  }

  &.active {
    color: var(--NAV_ACTIVE);
  }
`;

const LeftNavbar = () => {
  return (
    <LeftNavbarWrapper>
      <Logo>foooooood</Logo>
      <StyledNavLink to="/" exact>
        <FontAwesomeIcon icon={faThLarge} />
        Overview
      </StyledNavLink>
      <StyledNavLink to="/recipes">
        <FontAwesomeIcon icon={faBookOpen} />
        Recipes
      </StyledNavLink>
      <StyledNavLink to="/favorites">
        <FontAwesomeIcon icon={faHeart} />
        Favorites
      </StyledNavLink>
      <StyledNavLink to="/settings">
        <FontAwesomeIcon icon={faCog} />
        Settings
      </StyledNavLink>
    </LeftNavbarWrapper>
  );
};

export const PageWrapper = ({ children }) => {
  return (
    <RootWrapper>
      <LeftNavbar />
      {children}
    </RootWrapper>
  );
};
