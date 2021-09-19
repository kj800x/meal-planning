import { FC } from "react";
import { SearchInput } from "../../library/SearchInput";
import { Button } from "../../library/Button";
import styled from "styled-components";
import { useHistory } from "react-router";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4px;
`;

const ButtonWrapper = styled.div`
  margin-left: 8px;
`;

interface SearchProps {
  query: string;
  setQuery: (newValue: string) => void;
}

export const Search: FC<SearchProps> = ({ query, setQuery }) => {
  const history = useHistory();

  return (
    <InputWrapper>
      <SearchInput value={query} onChange={setQuery} />
      <ButtonWrapper>
        <Button
          onClick={() => {
            history.push("/recipe/new");
          }}
        >
          New
        </Button>
      </ButtonWrapper>
    </InputWrapper>
  );
};
