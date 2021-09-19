import { get } from "../util/get";
import { makeDomainObjectLoader } from "../util/makeDomainObjectLoader";
import { DomainObject } from "./types";
import {
  AllergenDataObject,
  fetchAllergenIdsByRecipeId,
} from "../data-objects/Allergen";
import {
  CuisineDataObject,
  fetchCuisineIdsByRecipeId,
} from "../data-objects/Cuisine";
import {
  fetchNutritionFactIdsByRecipeId,
  NutritionFactDataObject,
} from "../data-objects/NutritionFact";
import { LOADER, RecipeDataObject } from "../data-objects/Recipe";
import {
  fetchStepIdsByRecipeId,
  RecipeStepDataObject,
} from "../data-objects/RecipeStep";
import {
  fetchUtensilIdsByRecipeId,
  UtensilDataObject,
} from "../data-objects/Utensil";
import {
  fetchByRecipeAndServings,
  fetchByRecipe,
  fetchValidServingsByRecipeId,
  YieldDataObject,
} from "../data-objects/Yield";

interface RecipeGQLType {
  id: number;
  source: string;
  title: string;
  time?: string;
  image?: string;
  description?: string;
  pdf?: string;
  url?: string;
  rating?: number;

  cuisines: (CuisineDataObject | Error)[];
  allergens: (AllergenDataObject | Error)[];
  nutritionFacts: (NutritionFactDataObject | Error)[];
  utensils: (UtensilDataObject | Error)[];
  steps: (RecipeStepDataObject | Error)[];
  ingredients: (YieldDataObject | Error)[];
  allServingIngredients: (YieldDataObject | Error)[];
  validServings: number[];
}

export const Recipe: DomainObject<RecipeGQLType, RecipeDataObject> = {
  resolver: {
    id: get("id"),
    source: get("source"),
    title: get("title"),
    time: get("time"),
    image: get("image"),
    description: get("description"),
    pdf: get("pdf"),
    url: get("url"),
    rating: get("rating"),

    cuisines: ({ id }, _, context) => {
      const results = fetchCuisineIdsByRecipeId(id);
      return context.loaders.Cuisine.loadMany(results);
    },
    allergens: ({ id }, _, context) => {
      const results = fetchAllergenIdsByRecipeId(id);
      return context.loaders.Allergen.loadMany(results);
    },
    nutritionFacts: ({ id }, _, context) => {
      const results = fetchNutritionFactIdsByRecipeId(id);
      return context.loaders.NutritionFact.loadMany(results);
    },
    utensils: ({ id }, _, context) => {
      const results = fetchUtensilIdsByRecipeId(id);
      return context.loaders.Utensil.loadMany(results);
    },
    steps: ({ id }, _, context) => {
      const results = fetchStepIdsByRecipeId(id);
      return context.loaders.RecipeStep.loadMany(results);
    },
    ingredients: ({ id }, { servings }, context) => {
      const results = fetchByRecipeAndServings(id, servings);
      return context.loaders.Yield.loadMany(results);
    },
    allServingIngredients: ({ id }, _, context) => {
      const results = fetchByRecipe(id);
      return context.loaders.Yield.loadMany(results);
    },
    validServings: ({ id }) => {
      return fetchValidServingsByRecipeId(id);
    },
  },
  loader: makeDomainObjectLoader(LOADER),
};
