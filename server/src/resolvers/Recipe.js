import { db } from "../db";
import { get } from "./util/get";
import { order } from "./util/loaderOrderer";

const RECIPE_LOADER = db.prepareIn("SELECT * FROM Recipe WHERE id IN (!?!)");
const FETCH_CUISINES = db
  .prepare("SELECT cuisineId FROM CuisineMap WHERE recipeId = ?")
  .pluck();
const FETCH_ALLERGENS = db
  .prepare("SELECT allergenId FROM AllergenMap WHERE recipeId = ?")
  .pluck();
const FETCH_NUTRITION_FACTS = db
  .prepare("SELECT id FROM NutritionFact WHERE recipeId = ?")
  .pluck();
const FETCH_UTENSILS = db
  .prepare("SELECT utensilId FROM UtensilMap WHERE recipeId = ?")
  .pluck();
const FETCH_STEPS = db
  .prepare("SELECT id FROM RecipeStep WHERE recipeId = ? ORDER BY ordering ASC")
  .pluck();
const FETCH_INGREDIENTS = db
  .prepare("SELECT id FROM Yield WHERE recipeId = ? AND servings = ?")
  .pluck();
const FETCH_VALID_SERVINGS = db
  .prepare("SELECT DISTINCT servings FROM Yield WHERE recipeId = ?")
  .pluck();

export const Recipe = {
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
      const results = FETCH_CUISINES.all(id);
      return context.dataLoaders.Cuisine.loadMany(results);
    },
    allergens: ({ id }, _, context) => {
      const results = FETCH_ALLERGENS.all(id);
      return context.dataLoaders.Allergen.loadMany(results);
    },
    nutritionFacts: ({ id }, _, context) => {
      const results = FETCH_NUTRITION_FACTS.all(id);
      return context.dataLoaders.NutritionFact.loadMany(results);
    },
    utensils: ({ id }, _, context) => {
      const results = FETCH_UTENSILS.all(id);
      return context.dataLoaders.Utensil.loadMany(results);
    },
    steps: ({ id }, _, context) => {
      const results = FETCH_STEPS.all(id);
      return context.dataLoaders.RecipeStep.loadMany(results);
    },
    ingredients: ({ id }, { servings }, context) => {
      const results = FETCH_INGREDIENTS.all(id, servings);
      return context.dataLoaders.Yield.loadMany(results);
    },
    validServings: ({ id }) => {
      return FETCH_VALID_SERVINGS.all(id);
    },
  },
  loader: async (ids) => {
    const result = RECIPE_LOADER.all(ids);
    return order(result, ids);
  },
};
