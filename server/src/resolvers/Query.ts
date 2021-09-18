import { db } from "../db";
import { NoLoaderDomainObject } from "../domain-objects/types";
import { GroceryAisleLoaderType } from "../domain-objects/GroceryAisle";
import { RecipeLoaderType } from "../domain-objects/Recipe";
import { IngredientLoaderType } from "../domain-objects/Ingredient";
import { MealPlanLoaderType } from "../domain-objects/MealPlan";

const FETCH_ALL_GROCERY_AISLES = db
  .prepare("SELECT id FROM GroceryAisle ORDER BY ordering ASC")
  .pluck();

const FETCH_ALL_MEAL_PLANS = db
  .prepare("SELECT id FROM MealPlan ORDER BY end DESC")
  .pluck();

const FETCH_LATEST_MEAL_PLAN = db
  .prepare("SELECT id FROM MealPlan ORDER BY end DESC LIMIT 1")
  .pluck();

const FETCH_PLAN_BY_DATE = db
  .prepare("SELECT id FROM MealPlan WHERE start <= ? AND ? <= end LIMIT 1")
  .pluck();

type QueryType = {
  groceryAisles: (GroceryAisleLoaderType | Error)[];
  recipe: RecipeLoaderType;
  searchIngredients: {
    ingredients: Promise<(IngredientLoaderType | Error)[]>;
    total: number;
  };
  searchRecipes: {
    recipes: Promise<(RecipeLoaderType | Error)[]>;
    total: number;
  };
  mealPlans: (MealPlanLoaderType | Error)[];
  currentMealPlan: MealPlanLoaderType;
  planByDate: MealPlanLoaderType;
};

export const Query: NoLoaderDomainObject<QueryType, null> = {
  resolver: {
    groceryAisles: (_parent, _args, context, _info) => {
      const aisles = FETCH_ALL_GROCERY_AISLES.all();
      return context.dataLoaders.GroceryAisle.loadMany(aisles);
    },

    recipe: (_parent, { id }, context, _info) => {
      return context.dataLoaders.Recipe.load(id);
    },

    searchIngredients: (_parent, { query, limit, offset }, context, _info) => {
      return {
        ingredients: [],
        total: 0,
      };
    },

    searchRecipes: (_parent, { query, limit, offset }, context, _info) => {
      return {
        recipes: [],
        total: 0,
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

    planByDate: (_parent, { date }, context, _info) => {
      const id = FETCH_PLAN_BY_DATE.get(date, date);
      if (!id) {
        return null;
      }
      return context.dataLoaders.MealPlan.load(id);
    },
  },
};
