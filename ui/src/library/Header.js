import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #717171;
  border-bottom: 1px solid black;
`;

const HomePageLink = styled(Link)`
  margin: 0;
  color: white;
  padding: 4px 8px;
  font-style: italic;
  font-size: 2.2em;
  font-weight: 600;
  text-decoration: none;
}
`;

export const Header = () => {
  return (
    <Wrapper>
      <HomePageLink to="/">Meal Planner</HomePageLink>
    </Wrapper>
  );
};
