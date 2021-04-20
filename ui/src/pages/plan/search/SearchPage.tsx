import { useState } from "react";
import { Header } from "../../../library/Header";
import { RecipeSearch } from "../features/RecipeSearch";
import { RecipeSearchResults } from "../features/RecipeResults";

import { Tabs } from "../Tabs";
import { useParams } from "react-router";
import { PageWrapper } from "../../../library/PageWrapper";

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const { id: planId } = useParams<{ id: string }>();

  return (
    <>
      <Header />
      <PageWrapper>
        <Tabs planId={parseInt(planId, 10)} />
        <RecipeSearch value={query} onChange={setQuery} />
        <RecipeSearchResults query={query} />
      </PageWrapper>
    </>
  );
};
