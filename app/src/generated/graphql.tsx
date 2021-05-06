import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Blob as represented by getTime */
  Blob: any;
  /** Date as represented by getTime */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};


export type AcquiredIngredient = {
  __typename?: 'AcquiredIngredient';
  type: AcquisitionType;
  id: Scalars['Int'];
  ingredient: Ingredient;
  quantity: Scalars['Float'];
  unit: Scalars['String'];
  mealPlan: MealPlan;
};

export enum AcquisitionType {
  Have = 'HAVE',
  Bought = 'BOUGHT'
}

export type Allergen = {
  __typename?: 'Allergen';
  id: Scalars['Int'];
  externalId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  recipes: Array<Recipe>;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Cuisine = {
  __typename?: 'Cuisine';
  id: Scalars['Int'];
  externalId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  recipes: Array<Recipe>;
};


export type GroceryAisle = {
  __typename?: 'GroceryAisle';
  id: Scalars['Int'];
  name: Scalars['String'];
  ordering: Scalars['Int'];
  ingredients: Array<Ingredient>;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['Int'];
  externalId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  groceryAisle?: Maybe<GroceryAisle>;
};

export type IngredientResultPage = {
  __typename?: 'IngredientResultPage';
  recipes: Array<Ingredient>;
  total: Scalars['Int'];
};


export type MealPlan = {
  __typename?: 'MealPlan';
  id: Scalars['Int'];
  breakfastSlots: Scalars['Int'];
  lunchSlots: Scalars['Int'];
  dinnerSlots: Scalars['Int'];
  start: Scalars['Date'];
  end: Scalars['Date'];
  extraIngredients: Array<ScheduledExtraIngredient>;
  acquiredIngredients: Array<AcquiredIngredient>;
  meals: Array<ScheduledMeal>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlan: MealPlan;
  planRecipe: MealPlan;
  moveMeal: MealPlan;
  cancelMeal: MealPlan;
};


export type MutationPlanRecipeArgs = {
  planId: Scalars['Int'];
  recipeId: Scalars['Int'];
  servings: Scalars['Int'];
  type: Scalars['String'];
  date?: Maybe<Scalars['Date']>;
};


export type MutationMoveMealArgs = {
  mealId: Scalars['Int'];
  type: Scalars['String'];
  date?: Maybe<Scalars['Date']>;
};


export type MutationCancelMealArgs = {
  mealId: Scalars['Int'];
};

export type NutritionFact = {
  __typename?: 'NutritionFact';
  id: Scalars['Int'];
  recipe: Recipe;
  name: Scalars['String'];
  amount: Scalars['Int'];
  unit: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  groceryAisles: Array<GroceryAisle>;
  recipe?: Maybe<Recipe>;
  searchIngredients: IngredientResultPage;
  searchRecipes: RecipeSearchResultPage;
  mealPlans: Array<MealPlan>;
  currentMealPlan?: Maybe<MealPlan>;
  mealPlan?: Maybe<MealPlan>;
  planByDate?: Maybe<MealPlan>;
};


export type QueryRecipeArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QuerySearchIngredientsArgs = {
  query: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QuerySearchRecipesArgs = {
  query: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryMealPlanArgs = {
  id: Scalars['Int'];
};


export type QueryPlanByDateArgs = {
  date: Scalars['Date'];
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['Int'];
  cuisines: Array<Cuisine>;
  allergens: Array<Allergen>;
  nutritionFacts: Array<NutritionFact>;
  utensils: Array<Utensil>;
  steps: Array<RecipeStep>;
  ingredients: Array<Yield>;
  validServings: Array<Scalars['Int']>;
  source: Scalars['String'];
  title: Scalars['String'];
  time?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  pdf?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Int']>;
};


export type RecipeIngredientsArgs = {
  servings?: Maybe<Scalars['Int']>;
};

export type RecipeSearchResultPage = {
  __typename?: 'RecipeSearchResultPage';
  recipes: Array<Recipe>;
  total: Scalars['Int'];
};

export type RecipeStep = {
  __typename?: 'RecipeStep';
  id: Scalars['Int'];
  recipe: Recipe;
  ordering: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  instructions?: Maybe<Scalars['String']>;
};

export type ScheduledExtraIngredient = {
  __typename?: 'ScheduledExtraIngredient';
  id: Scalars['Int'];
  ingredient: Ingredient;
  quantity: Scalars['Float'];
  unit: Scalars['String'];
  mealPlan: MealPlan;
};

export type ScheduledMeal = {
  __typename?: 'ScheduledMeal';
  id: Scalars['Int'];
  completed: Scalars['Boolean'];
  servings: Scalars['Int'];
  recipe: Recipe;
  mealPlan: MealPlan;
  ingredients: Array<Yield>;
};

export type Utensil = {
  __typename?: 'Utensil';
  id: Scalars['Int'];
  externalId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  recipes: Array<Recipe>;
};

export type Yield = {
  __typename?: 'Yield';
  id: Scalars['Int'];
  servings: Scalars['Int'];
  recipe: Recipe;
  ingredient: Ingredient;
  quantity: Scalars['Float'];
  unit: Scalars['String'];
};

export type CookbookRecipesQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type CookbookRecipesQuery = (
  { __typename?: 'Query' }
  & { searchRecipes: (
    { __typename?: 'RecipeSearchResultPage' }
    & Pick<RecipeSearchResultPage, 'total'>
    & { recipes: Array<(
      { __typename?: 'Recipe' }
      & Pick<Recipe, 'id' | 'validServings' | 'title' | 'time' | 'image' | 'description' | 'url' | 'rating'>
      & { cuisines: Array<(
        { __typename?: 'Cuisine' }
        & Pick<Cuisine, 'id' | 'name'>
      )>, allergens: Array<(
        { __typename?: 'Allergen' }
        & Pick<Allergen, 'id' | 'name'>
      )> }
    )> }
  ) }
);

export type PlanByDateQueryVariables = Exact<{
  date: Scalars['Date'];
}>;


export type PlanByDateQuery = (
  { __typename?: 'Query' }
  & { planByDate?: Maybe<(
    { __typename?: 'MealPlan' }
    & Pick<MealPlan, 'id' | 'breakfastSlots' | 'lunchSlots' | 'dinnerSlots' | 'start' | 'end'>
    & { extraIngredients: Array<(
      { __typename?: 'ScheduledExtraIngredient' }
      & Pick<ScheduledExtraIngredient, 'id' | 'unit' | 'quantity'>
      & { ingredient: (
        { __typename?: 'Ingredient' }
        & Pick<Ingredient, 'id' | 'name' | 'image'>
        & { groceryAisle?: Maybe<(
          { __typename?: 'GroceryAisle' }
          & Pick<GroceryAisle, 'name' | 'ordering' | 'id'>
        )> }
      ) }
    )>, meals: Array<(
      { __typename?: 'ScheduledMeal' }
      & Pick<ScheduledMeal, 'id' | 'servings'>
      & { ingredients: Array<(
        { __typename?: 'Yield' }
        & Pick<Yield, 'id' | 'servings' | 'quantity' | 'unit'>
        & { ingredient: (
          { __typename?: 'Ingredient' }
          & Pick<Ingredient, 'id' | 'name' | 'image'>
          & { groceryAisle?: Maybe<(
            { __typename?: 'GroceryAisle' }
            & Pick<GroceryAisle, 'name' | 'ordering' | 'id'>
          )> }
        ) }
      )>, recipe: (
        { __typename?: 'Recipe' }
        & Pick<Recipe, 'title' | 'image' | 'description'>
      ) }
    )> }
  )> }
);


export const CookbookRecipesDocument = gql`
    query cookbookRecipes($query: String!) {
  searchRecipes(query: $query) {
    total
    recipes {
      id
      cuisines {
        id
        name
      }
      allergens {
        id
        name
      }
      validServings
      title
      time
      image
      description
      url
      rating
    }
  }
}
    `;

/**
 * __useCookbookRecipesQuery__
 *
 * To run a query within a React component, call `useCookbookRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCookbookRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCookbookRecipesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useCookbookRecipesQuery(baseOptions: Apollo.QueryHookOptions<CookbookRecipesQuery, CookbookRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CookbookRecipesQuery, CookbookRecipesQueryVariables>(CookbookRecipesDocument, options);
      }
export function useCookbookRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CookbookRecipesQuery, CookbookRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CookbookRecipesQuery, CookbookRecipesQueryVariables>(CookbookRecipesDocument, options);
        }
export type CookbookRecipesQueryHookResult = ReturnType<typeof useCookbookRecipesQuery>;
export type CookbookRecipesLazyQueryHookResult = ReturnType<typeof useCookbookRecipesLazyQuery>;
export type CookbookRecipesQueryResult = Apollo.QueryResult<CookbookRecipesQuery, CookbookRecipesQueryVariables>;
export const PlanByDateDocument = gql`
    query planByDate($date: Date!) {
  planByDate(date: $date) {
    id
    breakfastSlots
    lunchSlots
    dinnerSlots
    start
    end
    extraIngredients {
      id
      unit
      quantity
      ingredient {
        id
        name
        image
        groceryAisle {
          name
          ordering
          id
        }
      }
    }
    meals {
      id
      servings
      ingredients {
        id
        servings
        ingredient {
          id
          name
          image
          groceryAisle {
            name
            ordering
            id
          }
        }
        quantity
        unit
      }
      recipe {
        title
        image
        description
      }
    }
  }
}
    `;

/**
 * __usePlanByDateQuery__
 *
 * To run a query within a React component, call `usePlanByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanByDateQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function usePlanByDateQuery(baseOptions: Apollo.QueryHookOptions<PlanByDateQuery, PlanByDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlanByDateQuery, PlanByDateQueryVariables>(PlanByDateDocument, options);
      }
export function usePlanByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlanByDateQuery, PlanByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlanByDateQuery, PlanByDateQueryVariables>(PlanByDateDocument, options);
        }
export type PlanByDateQueryHookResult = ReturnType<typeof usePlanByDateQuery>;
export type PlanByDateLazyQueryHookResult = ReturnType<typeof usePlanByDateLazyQuery>;
export type PlanByDateQueryResult = Apollo.QueryResult<PlanByDateQuery, PlanByDateQueryVariables>;