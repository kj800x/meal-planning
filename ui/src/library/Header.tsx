import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  border-radius: 0.5875rem 0.5875rem 0 0;
  padding: 1.5rem;
  // background: linear-gradient(blue, purple);
  border-bottom: 4px solid green;

  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const AppName = styled.div`
  font-size: 75px;
`;

const NavWrapper = styled.div`
  max-width: 1200px;
  background: lightblue;
  display: flex;
  margin: 0 auto;
`;

const StyledNavLink = styled(NavLink)`
  flex: 1;
  text-align: center;
  padding: 20px;
  font-size: 20px;
  text-decoration: none;
  color: black;
  border: 4px solid green;
  border-top: none;

  border-left: none;
  &:first-child {
    border-left: 4px solid green;
  }
`;

export const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <AppName>Meal Planner</AppName>
      </HeaderWrapper>
      <NavWrapper>
        <StyledNavLink to={"/"}>Recipes</StyledNavLink>
        <StyledNavLink to={"/plans"}>Plans</StyledNavLink>
        <StyledNavLink to={"/ingredients"}>Ingredients</StyledNavLink>
      </NavWrapper>
    </>
  );
};
