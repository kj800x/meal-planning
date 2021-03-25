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