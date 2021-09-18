import { prepareIn, db } from "../db";

export interface RecipeDataObject {
  id: number;
  source: string;
  title: string;
  time?: string;
  image?: string;
  description?: string;
  pdf?: string;
  url?: string;
  rating?: number;
}

const FETCH_RECIPE_IDS_BY_ALLERGEN = db
  .prepare("SELECT recipeId FROM AllergenMap WHERE allergenId = ?")
  .pluck();

export function fetchRecipeIdsByAllergen(allergenId: number): number[] {
  return FETCH_RECIPE_IDS_BY_ALLERGEN.all(allergenId);
}

const FETCH_RECIPE_IDS_BY_CUISINE = db
  .prepare("SELECT recipeId FROM CuisineMap WHERE cuisineId = ?")
  .pluck();

export function fetchRecipeIdsByCuisine(cuisineId: number): number[] {
  return FETCH_RECIPE_IDS_BY_CUISINE.all(cuisineId);
}

const FETCH_RECIPE_IDS_BY_UTENSIL = db
  .prepare("SELECT recipeId FROM UtensilMap WHERE utensilId = ?")
  .pluck();

export function fetchRecipeIdsByUtensil(utensilId: number): number[] {
  return FETCH_RECIPE_IDS_BY_UTENSIL.all(utensilId);
}

export const LOADER = prepareIn<number, RecipeDataObject>(
  "SELECT * FROM Recipe WHERE id IN (!?!)"
);
