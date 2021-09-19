import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../library/Button";
import searching from "./searching.svg";

const Wrapper = styled.div`
  padding: 10px;
  text-align: center;
`;

const Header = styled.h2``;

const SearchIllustration = styled.img`
  width: 200px;
  margin: 0 auto;
  display: block;
`;

const Ctas = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const StyledLink = styled(Button)`
  background-color: #cc0000;
  border: 1px solid #660000;
  border-radius: 5px;
  color: #fff;
  margin: 30px 10px;
  padding: 10px 10px 10px 10px;
  text-decoration: none;
  font-weight: bold;
`;

export const NoResults = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <Header>Can't find what you're looking for?</Header>
      <SearchIllustration src={searching} alt="" />
      <Ctas>
        <StyledLink
          onClick={() => {
            history.push(`/recipe/new`);
          }}
        >
          Create a Custom Recipe
        </StyledLink>
      </Ctas>
    </Wrapper>
  );
};
