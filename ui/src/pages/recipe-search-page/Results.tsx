import { FC } from "react";
import { useRecipeSearchQuery } from "../../generated/graphql";
import { ErrorDisplay } from "../../library/ErrorDisplay";
import { Loading } from "../../library/Loading";
import { NoResults } from "./NoResults";

interface ResultsProps {
  query: string;
}

export const Results: FC<ResultsProps> = ({ query }) => {
  const { data, loading, error } = useRecipeSearchQuery({
    variables: { query },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (data?.searchRecipes.total === 0) {
    return <NoResults />;
  }

  return null;
};
