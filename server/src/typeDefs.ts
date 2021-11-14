import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar JSON
  scalar Date
  scalar Blob

  type Allergen {
    id: Int!
    externalId: String
    name: String!
    image: String
    recipes: [Recipe!]!
  }
  type Cuisine {
    id: Int!
    externalId: String
    name: String!
    image: String
    recipes: [Recipe!]!
  }
  type GroceryAisle {
    id: Int!
    name: String!
    ordering: Int!
    ingredients: [Ingredient!]!
  }
  type Ingredient {
    id: Int!
    externalId: String
    name: String!
    image: String
    groceryAisle: GroceryAisle
  }
  type NutritionFact {
    id: Int!
    recipe: Recipe!
    name: String!
    amount: Float!
    unit: String!
  }
  type Recipe {
    id: Int!
    cuisines: [Cuisine!]!
    allergens: [Allergen!]!
    nutritionFacts: [NutritionFact!]!
    utensils: [Utensil!]!
    steps: [RecipeStep!]!
    ingredients(servings: Int): [Yield!]!
    allServingIngredients: [Yield!]!
    validServings: [Int!]!

    source: String!
    title: String!
    time: String
    image: String
    description: String
    pdf: String
    url: String
    rating: Int
  }
  type RecipeStep {
    id: Int!
    recipe: Recipe!
    ordering: Int!
    image: String
    instructions: String
  }
  type Utensil {
    id: Int!
    externalId: String
    name: String!
    recipes: [Recipe!]!
  }
  type Yield {
    id: Int!
    servings: Int!
    recipe: Recipe!
    ingredient: Ingredient!
    quantity: Float!
    unit: String!
  }
  type IngredientResultPage {
    recipes: [Ingredient!]!
    total: Int!
  }
  type RecipeSearchResultPage {
    recipes: [Recipe!]!
    total: Int!
  }

  type ScheduledExtraIngredient {
    id: Int!
    ingredient: Ingredient!
    quantity: Float!
    unit: String!
    mealPlan: MealPlan!
  }
  type ScheduledMeal {
    id: Int!
    completed: Boolean!
    servings: Int!
    recipe: Recipe!
    mealPlan: MealPlan!
    ingredients: [Yield!]!
  }
  type MealPlan {
    id: Int!
    breakfastSlots: Int!
    lunchSlots: Int!
    dinnerSlots: Int!
    start: Date!
    end: Date!
    extraIngredients: [ScheduledExtraIngredient!]!
    meals: [ScheduledMeal!]!
  }
  type Query {
    groceryAisles: [GroceryAisle!]!
    recipe(id: Int): Recipe!
    searchIngredients(
      query: String!
      limit: Int = 30
      offset: Int = 0
    ): IngredientResultPage!
    searchRecipes(
      query: String!
      limit: Int = 30
      offset: Int = 0
    ): RecipeSearchResultPage!
    mealPlans: [MealPlan!]!
    currentMealPlan: MealPlan
    mealPlan(id: Int!): MealPlan
    planByDate(date: Date!): MealPlan
  }

  type Mutation {
    createPlan: MealPlan!
    planRecipe(
      planId: Int!
      recipeId: Int!
      servings: Int!
      type: String!
      date: Date
    ): MealPlan!
    moveMeal(mealId: Int!, type: String!, date: Date): MealPlan!
    cancelMeal(mealId: Int!): MealPlan!
    createRecipe(title: String!): Recipe!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
