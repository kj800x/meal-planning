import DataLoader from "dataloader";
import { AllergenDataObject } from "../data-objects/Allergen";
import { CuisineDataObject } from "../data-objects/Cuisine";
import { GroceryAisleDataObject } from "../data-objects/GroceryAisle";
import { IngredientDataObject } from "../data-objects/Ingredient";
import { MealPlanDataObject } from "../data-objects/MealPlan";
import { NutritionFactDataObject } from "../data-objects/NutritionFact";
import { RecipeDataObject } from "../data-objects/Recipe";
import { RecipeStepDataObject } from "../data-objects/RecipeStep";
import { ScheduledExtraIngredientDataObject } from "../data-objects/ScheduledExtraIngredient";
import { ScheduledMealDataObject } from "../data-objects/ScheduledMeal";
import { UtensilDataObject } from "../data-objects/Utensil";
import { YieldDataObject } from "../data-objects/Yield";

export type DataLoaders = {
  Allergen: DataLoader<number, AllergenDataObject>;
  Cuisine: DataLoader<number, CuisineDataObject>;
  GroceryAisle: DataLoader<number, GroceryAisleDataObject>;
  Ingredient: DataLoader<number, IngredientDataObject>;
  MealPlan: DataLoader<number, MealPlanDataObject>;
  NutritionFact: DataLoader<number, NutritionFactDataObject>;
  Recipe: DataLoader<number, RecipeDataObject>;
  RecipeStep: DataLoader<number, RecipeStepDataObject>;
  ScheduledExtraIngredient: DataLoader<
    number,
    ScheduledExtraIngredientDataObject
  >;
  ScheduledMeal: DataLoader<number, ScheduledMealDataObject>;
  Utensil: DataLoader<number, UtensilDataObject>;
  Yield: DataLoader<number, YieldDataObject>;
};

export type Context = {
  loaders: DataLoaders;
};

export type NoLoaderDomainObject<ObjectType, LoaderType> = {
  resolver: {
    [key in keyof ObjectType]:
      | ((
          loadedObject: LoaderType,
          args: any,
          context: Context
        ) => Promise<ObjectType[key]>)
      | ((
          loadedObject: LoaderType,
          args: any,
          context: Context
        ) => ObjectType[key]);
  };
};

export type DomainObject<ObjectType, LoaderType> = NoLoaderDomainObject<
  ObjectType,
  LoaderType
> & {
  loader: (id: readonly number[]) => Promise<LoaderType[]>;
};
