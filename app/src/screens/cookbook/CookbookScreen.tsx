import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { Recipe, useCookbookRecipesQuery } from '../../generated/graphql';
import { ErrorDisplay } from '../../library/ErrorDisplay';
import { Loading } from '../../library/Loading';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDebounce } from './useDebounce';

const RootView = styled.View`
  flex: 1;
`;

const SearchBar: FC<{ text: string; setText: (string) => void }> = ({ text, setText }) => {
  return (
    <TextInput dense={true} placeholder="What would you like to cook?" value={text} onChangeText={t => setText(t)} />
  );
};

const RecipeWrapper = styled.TouchableOpacity`
  height: 80px;
  margin: 6px 12px;
  border-radius: 20px;
  flex-direction: row;
  border: 1px solid black;
  overflow: hidden;
`;

const RecipeImage = styled.Image`
  width: 120px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;
const RecipeDetails = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  padding: 4px;
`;
const RecipeTitle = styled.Text`
  font-size: 16px;
`;
const RecipeDescription = styled.Text`
  font-size: 12px;
`;

const HeaderText = styled.Text`
  color: grey;
  font-size: 24px;
  text-align: center;
  margin: 12px;
`;

const ZeroResults: FC<{}> = () => {
  return <HeaderText>No recipes found</HeaderText>;
};

const EmptyQueryState: FC<{ search: string }> = ({ search }) => {
  return (
    <HeaderText>
      Enter {3 - search.length} more character{3 - search.length !== 1 ? 's' : ''}
    </HeaderText>
  );
};

const RecipeSearchResult: FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <RecipeWrapper>
      <RecipeImage source={{ uri: 'https://meals.coolkev.com/meals/assets' + recipe.image }} />
      <RecipeDetails>
        <RecipeTitle numberOfLines={1}>{recipe.title}</RecipeTitle>
        <RecipeDescription numberOfLines={3}>{recipe.description}</RecipeDescription>
      </RecipeDetails>
    </RecipeWrapper>
  );
};

const SearchResults: FC<{ query: string }> = ({ query }) => {
  const debouncedQuery = useDebounce(query, 350);

  const isDebounced = debouncedQuery !== query;
  const { data, loading, error } = useCookbookRecipesQuery({ variables: { query: debouncedQuery } });

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (loading || isDebounced) {
    return <Loading />;
  }

  return (
    <ScrollView>
      {data.searchRecipes.recipes.map(recipe => (
        <RecipeSearchResult key={recipe.id} recipe={recipe as Recipe} />
      ))}
      {data.searchRecipes.total === 0 ? <ZeroResults /> : null}
    </ScrollView>
  );
};

export const CookbookScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <RootView>
      <SearchBar text={search} setText={setSearch} />
      {search.length < 3 ? <EmptyQueryState search={search} /> : <SearchResults query={search} />}
    </RootView>
  );
};
