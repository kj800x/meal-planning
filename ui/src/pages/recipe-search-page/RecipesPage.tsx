import { useState } from "react";
import styled from "styled-components";
import { Results } from "./Results";
import { Search } from "./Search";

const Wrapper = styled.div``;

export const RecipesPage = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <Wrapper>
      <Search query={query} setQuery={setQuery} />
      <Results query={query} />
    </Wrapper>
  );
};
