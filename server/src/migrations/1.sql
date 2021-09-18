CREATE TABLE Recipe (
  id INTEGER PRIMARY KEY,
  source VARCHAR(128) NOT NULL, -- HelloFresh or custom
  title VARCHAR(512) NOT NULL,
  time VARCHAR(128),
  image VARCHAR(1024),
  description TEXT,
  pdf VARCHAR(1024),
  url VARCHAR(1024),
  rating INTEGER
);

CREATE TABLE RecipeStep (
  id INTEGER PRIMARY KEY,
  ordering INTEGER NOT NULL,
  image VARCHAR(1024),
  instructions TEXT NOT NULL,
  recipeId INTEGER NOT NULL
);

CREATE TABLE NutritionFact (
  id INTEGER PRIMARY KEY,
  recipeId INTEGER NOT NULL,
  name VARCHAR(128) NOT NULL,
  amount INTEGER NOT NULL,
  unit VARCHAR(128) NOT NULL
);

CREATE TABLE Utensil (
  id INTEGER PRIMARY KEY,
  externalId VARCHAR(128),
  name VARCHAR(512) NOT NULL
);

CREATE TABLE UtensilMap (
  recipeId INTEGER NOT NULL,
  utensilId INTEGER NOT NULL,
  quantity INTEGER
);

CREATE TABLE CuisineMap (
  recipeId INTEGER NOT NULL,
  cuisineId INTEGER NOT NULL
);

CREATE TABLE AllergenMap (
  recipeId INTEGER NOT NULL,
  allergenId INTEGER NOT NULL
);

CREATE TABLE Cuisine (
  id INTEGER PRIMARY KEY,
  externalId VARCHAR(128),
  name VARCHAR(512) NOT NULL,
  image VARCHAR(1024)
);

CREATE TABLE Allergen (
  id INTEGER PRIMARY KEY,
  externalId VARCHAR(128),
  name VARCHAR(512) NOT NULL,
  image VARCHAR(1024)
);

CREATE TABLE Yield (
  id INTEGER PRIMARY KEY,
  servings INTEGER NOT NULL,
  recipeId INTEGER NOT NULL,
  ingredientId INTEGER NOT NULL,
  quantity REAL NOT NULL, -- 1 for unitless
  unit VARCHAR(128) NOT NULL -- UNITLESS for unitless ingredients like salt or pepper
);

CREATE TABLE Ingredient (
  id INTEGER PRIMARY KEY,
  externalId VARCHAR(128),
  name VARCHAR(128) NOT NULL,
  image VARCHAR(128),
  groceryAisleId INTEGER
);

CREATE TABLE GroceryAisle (
  id INTEGER PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  ordering INTEGER NOT NULL
);

CREATE TABLE MealPlan (
  id INTEGER PRIMARY KEY,
  breakfastSlots INTEGER NOT NULL,
  lunchSlots INTEGER NOT NULL,
  dinnerSlots INTEGER NOT NULL,
  start INTEGER NOT NULL,
  end INTEGER NOT NULL
);

CREATE TABLE ScheduledExtraIngredient (
  id INTEGER PRIMARY KEY,
  mealPlanId INTEGER NOT NULL,
  ingredientId INTEGER NOT NULL,
  quantity FLOAT NOT NULL,
  unit VARCHAR(1024) NOT NULL
);

CREATE TABLE ScheduledMeal (
  id INTEGER PRIMARY KEY,
  mealPlanId INTEGER NOT NULL,
  recipeId INTEGER NOT NULL,
  date INTEGER,
  servings INTEGER NOT NULL,
  type VARCHAR(1024) NOT NULL
);