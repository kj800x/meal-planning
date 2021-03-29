import { db } from "../db";
// import { runIngredientSearch } from "../services/ingredientSearch";
import { runRecipeSearch } from "../services/recipeSearch";

const FETCH_ALL_GROCERY_AISLES = db
  .prepare("SELECT id FROM GroceryAisle ORDER BY ordering ASC")
  .pluck();

const FETCH_ALL_MEAL_PLANS = db
  .prepare("SELECT id FROM MealPlan ORDER BY end DESC")
  .pluck();

const FETCH_LATEST_MEAL_PLAN = db
  .prepare("SELECT id FROM MealPlan ORDER BY end DESC LIMIT 1")
  .pluck();

export const Query = {
  resolver: {
    groceryAisles: (_parent, _args, context, _info) => {
      const aisles = FETCH_ALL_GROCERY_AISLES.all();
      return context.dataLoaders.GroceryAisle.loadMany(aisles);
    },

    recipe: (_parent, { id }, context, _info) => {
      return context.dataLoaders.Recipe.load(id);
    },

    searchIngredients: (_parent, { query, limit, offset }, context, _info) => {
      // const { ingredients, total } = runIngredientSearch({
      //   query,
      //   limit,
      //   offset,
      // });
      return {
        ingredients: [], //context.dataLoaders.Ingredient.loadMany(ingredients),
        total: 0,
      };
    },

    searchRecipes: (_parent, { query, limit, offset }, context, _info) => {
      const { recipes, total } = runRecipeSearch({ query, limit, offset });
      return {
        recipes: context.dataLoaders.Recipe.loadMany(recipes),
        total: total,
      };
    },

    mealPlans: (_parent, _args, context, _info) => {
      const ids = FETCH_ALL_MEAL_PLANS.all();
      return context.dataLoaders.MealPlan.loadMany(ids);
    },

    currentMealPlan: (_parent, _args, context, _info) => {
      const id = FETCH_LATEST_MEAL_PLAN.get();
      return context.dataLoaders.MealPlan.load(id);
    },

    mealPlan: (_parent, { id }, context, _info) => {
      return context.dataLoaders.MealPlan.load(id);
    },
  },
};
