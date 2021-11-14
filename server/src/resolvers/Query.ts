import { db } from "../db";
import { NoLoaderDomainObject } from "../domain-objects/types";
import { GroceryAisleDataObject } from "../data-objects/GroceryAisle";
import { RecipeDataObject } from "../data-objects/Recipe";
import { IngredientDataObject } from "../data-objects/Ingredient";
import { MealPlanDataObject } from "../data-objects/MealPlan";
import { searchRecipes } from "../services/searchRecipes";

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
  groceryAisles: (GroceryAisleDataObject | Error)[];
  recipe: RecipeDataObject;
  searchIngredients: {
    ingredients: Promise<(IngredientDataObject | Error)[]>;
    total: number;
  };
  searchRecipes: {
    recipes: Promise<(RecipeDataObject | Error)[]>;
    total: number;
  };
  mealPlans: (MealPlanDataObject | Error)[];
  mealPlan: MealPlanDataObject;
  currentMealPlan: MealPlanDataObject;
  planByDate: Promise<MealPlanDataObject> | null;
};

export interface SearchArgs {
  query: string;
  offset: number;
  limit: number;
}

export const Query: NoLoaderDomainObject<QueryType, null> = {
  resolver: {
    groceryAisles: (
      _parent,
      _args,
      context
    ): Promise<(GroceryAisleDataObject | Error)[]> => {
      const aisles = FETCH_ALL_GROCERY_AISLES.all();
      return context.loaders.GroceryAisle.loadMany(aisles);
    },

    recipe: (_parent, { id }: { id: number }, context) => {
      return context.loaders.Recipe.load(id);
    },

    searchIngredients: (_parent, _searchArgs: SearchArgs, _context) => {
      return {
        ingredients: Promise.resolve([]),
        total: 0,
      };
    },

    searchRecipes: (_parent, searchArgs: SearchArgs, context) => {
      const { ids, total } = searchRecipes(searchArgs);

      return {
        recipes: context.loaders.Recipe.loadMany(ids),
        total,
      };
    },

    mealPlans: (_parent, _args, context) => {
      const ids = FETCH_ALL_MEAL_PLANS.all();
      return context.loaders.MealPlan.loadMany(ids);
    },

    currentMealPlan: (_parent, _args, context) => {
      const id = FETCH_LATEST_MEAL_PLAN.get();
      return context.loaders.MealPlan.load(id);
    },

    mealPlan: (_parent, { id }: { id: number }, context) => {
      return context.loaders.MealPlan.load(id);
    },

    planByDate: (_parent, { date }: { date: number }, context) => {
      const id = FETCH_PLAN_BY_DATE.get(date, date);
      if (!id) {
        return null;
      }
      return context.loaders.MealPlan.load(id);
    },
  },
};
