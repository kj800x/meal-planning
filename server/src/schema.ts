import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import DataLoader from "dataloader";
import { mapValues } from "./util/mapValues";
import type { DataLoaders, DomainObject } from "./domain-objects/types";
import { typeDefs } from "./typeDefs";

import GraphQLJSON from "graphql-type-json";
import GraphQLDate from "./customScalars/Date";
import GraphQLBlob from "./customScalars/Blob";
import { Mutation } from "./resolvers/Mutation";
import { Query } from "./resolvers/Query";

import { Allergen } from "./domain-objects/Allergen";
import { Cuisine } from "./domain-objects/Cuisine";
import { GroceryAisle } from "./domain-objects/GroceryAisle";
import { Ingredient } from "./domain-objects/Ingredient";
import { NutritionFact } from "./domain-objects/NutritionFact";
import { Recipe } from "./domain-objects/Recipe";
import { RecipeStep } from "./domain-objects/RecipeStep";
import { Utensil } from "./domain-objects/Utensil";
import { Yield } from "./domain-objects/Yield";
import { MealPlan } from "./domain-objects/MealPlan";
import { ScheduledExtraIngredient } from "./domain-objects/ScheduledExtraIngredient";
import { ScheduledMeal } from "./domain-objects/ScheduledMeal";

type DomainObjects = {
  [key: string]: DomainObject<any, any>;
};

export const DOMAIN_OBJECTS: DomainObjects = {
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

export function buildDataLoaders(): DataLoaders {
  return {
    ...mapValues(DOMAIN_OBJECTS, (object) => new DataLoader(object.loader)),
  } as DataLoaders;
}

const resolvers = {
  JSON: GraphQLJSON,
  Date: GraphQLDate,
  Blob: GraphQLBlob,

  ...mapValues(DOMAIN_OBJECTS, (object) => object.resolver),

  Query: Query.resolver,
  Mutation: Mutation.resolver,
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    loaders: buildDataLoaders(),
  }),
  uploads: false,
  subscriptions: "/meals/graphql",
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
