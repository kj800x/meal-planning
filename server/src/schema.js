import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { mapValues } from "./resolvers/util/mapValues";

import GraphQLJSON from "graphql-type-json";
import GraphQLDate from "./customScalars/Date";
import GraphQLBlob from "./customScalars/Blob";
import { typeDefs } from "./typeDefs";
import { Allergen } from "./resolvers/Allergen";
import { Cuisine } from "./resolvers/Cuisine";
import { GroceryAisle } from "./resolvers/GroceryAisle";
import { Ingredient } from "./resolvers/Ingredient";
import { NutritionFact } from "./resolvers/NutritionFact";
import { Recipe } from "./resolvers/Recipe";
import { RecipeStep } from "./resolvers/RecipeStep";
import { Utensil } from "./resolvers/Utensil";
import { Yield } from "./resolvers/Yield";
import { Query } from "./resolvers/Query";
import { MealPlan } from "./resolvers/MealPlan";
import { ScheduledExtraIngredient } from "./resolvers/ScheduledExtraIngredient";
import { ScheduledMeal } from "./resolvers/ScheduledMeal";
import { buildDataLoaders } from "./dataLoaders";
import { Mutation } from "./resolvers/Mutation";

const domainObjects = {
  Allergen,
  Cuisine,
  GroceryAisle,
  Ingredient,
  NutritionFact,
  Recipe,
  RecipeStep,
  Utensil,
  Yield,
  MealPlan,
  ScheduledExtraIngredient,
  ScheduledMeal,
};

const resolvers = {
  JSON: GraphQLJSON,
  Date: GraphQLDate,
  Blob: GraphQLBlob,

  ...mapValues(domainObjects, (v) => v.resolver),

  Mutation: Mutation.resolver,
  Query: Query.resolver,
};

const dataLoaders = {
  ...mapValues(domainObjects, (v) => v.loader),
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    dataLoaders: buildDataLoaders(dataLoaders),
  }),
  uploads: false,
  playground: {
    endpoint: "/meals/graphql",
    settings: {
      "editor.theme": "dark",
    },
  },
});

export const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
