import { migrator } from "../migrations";
import { DATA_DIR } from "../env/dataDir";
import path from "path";
import fs from "fs";
import process from "process";
import betterSqlite3 from "better-sqlite3";

const run = (prepared, ...args) => prepared.run(...args).lastInsertRowid;

function addHelperMethods(db) {
  db.ensure = (finder, finderArgs, inserter, inserterArgs) => (item) => {
    const existing = finder.pluck().get(...finderArgs(item));
    if (existing) {
      return existing;
    }
    return run(inserter, ...inserterArgs(item));
  };

  db.findAllergen = db.prepare("SELECT id FROM Allergen WHERE externalId = ?");
  db.insertAllergen = db.prepare(
    "INSERT INTO Allergen (externalId, name, image) VALUES (?, ?, ?)"
  );
  db.ensureAllergen = db.ensure(
    db.findAllergen,
    (allergen) => [allergen.id],
    db.insertAllergen,
    (allergen) => [allergen.id, allergen.name, allergen.iconPath]
  );
  db.associateAllergen = db.prepare(
    "INSERT INTO AllergenMap (recipeId, allergenId) VALUES (?, ?)"
  );
  db.findCuisine = db.prepare("SELECT id FROM Cuisine WHERE externalId = ?");
  db.insertCuisine = db.prepare(
    "INSERT INTO Cuisine (externalId, name, image) VALUES (?, ?, ?)"
  );
  db.ensureCuisine = db.ensure(
    db.findCuisine,
    (cuisine) => [cuisine.id],
    db.insertCuisine,
    (cuisine) => [cuisine.id, cuisine.name, cuisine.iconPath]
  );
  db.associateCuisine = db.prepare(
    "INSERT INTO CuisineMap (recipeId, cuisineId) VALUES (?, ?)"
  );
  db.findIngredient = db.prepare(
    "SELECT id FROM Ingredient WHERE externalId = ?"
  );
  db.insertIngredient = db.prepare(
    "INSERT INTO Ingredient (externalId, name, image) VALUES (?, ?, ?)"
  );
  db.ensureIngredient = db.ensure(
    db.findIngredient,
    (ingredient) => [ingredient.id],
    db.insertIngredient,
    (ingredient) => [ingredient.id, ingredient.name, ingredient.iconPath]
  );
  db.insertNutritionFact = db.prepare(
    "INSERT INTO NutritionFact (recipeId, name, amount, unit) VALUES (?, ?, ?, ?)"
  );
  db.insertRecipe = db.prepare(
    "INSERT INTO Recipe (source, title, time, image, description, pdf, url) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  db.findUtensil = db.prepare("SELECT id FROM Utensil WHERE externalId = ?");
  db.insertUtensil = db.prepare(
    "INSERT INTO Utensil (externalId, name) VALUES (?, ?)"
  );
  db.ensureUtensil = db.ensure(
    db.findUtensil,
    (utensil) => [utensil.id],
    db.insertUtensil,
    (utensil) => [utensil.id, utensil.name]
  );
  db.associateUtensil = db.prepare(
    "INSERT INTO UtensilMap (recipeId, utensilId, quantity) VALUES (?, ?, ?)"
  );
  db.associateIngredient = db.prepare(
    "INSERT INTO Yield (servings, recipeId, ingredientId, quantity, unit) VALUES (?, ?, ?, ?, ?)"
  );
  db.insertRecipeStep = db.prepare(
    "INSERT INTO RecipeStep (ordering, image, instructions, recipeId) VALUES (?, ?, ?, ?)"
  );
}

async function importRecipe(recipe, db) {
  // Ensure recipe
  const recipeId = run(
    db.insertRecipe,
    "hellofresh.com",
    recipe.name,
    recipe.prepTime,
    recipe.imagePath,
    recipe.description,
    recipe.cardLink,
    recipe.websiteUrl
  );

  // Insert nutrition info
  for (const fact of recipe.nutrition) {
    if (fact.amount) {
      run(db.insertNutritionFact, recipeId, fact.name, fact.amount, fact.unit);
    }
  }

  for (const allergen of recipe.allergens) {
    // Ensure allergens
    const allergenId = db.ensureAllergen(allergen);
    // Associate allergens
    run(db.associateAllergen, recipeId, allergenId);
  }

  for (const utensil of recipe.utensils) {
    // Ensure utensils
    const utensilId = db.ensureUtensil(utensil);
    // Associate utensils
    run(db.associateUtensil, recipeId, utensilId, 1);
  }

  for (const cuisine of recipe.cuisines) {
    // Ensure utensils
    const cuisineId = db.ensureCuisine(cuisine);
    // Associate utensils
    run(db.associateCuisine, recipeId, cuisineId);
  }

  for (const step of recipe.steps) {
    // Insert recipe steps
    run(
      db.insertRecipeStep,
      step.index - 1,
      step.images.length > 0 ? step.images[0].path : null,
      step.instructions,
      recipeId
    );
  }

  // Insert ingredients and yield information
  const ingredientMap = {};

  for (const ingredient of recipe.ingredients) {
    const ingredientId = db.ensureIngredient(ingredient);
    ingredientMap[ingredient.id] = ingredientId;
  }

  for (const ingredientYield of recipe.yields) {
    for (const ing of ingredientYield.ingredients) {
      run(
        db.associateIngredient,
        ingredientYield.yields,
        recipeId,
        ingredientMap[ing.id],
        ing.amount || 1,
        ing.unit || "UNITLESS"
      );
    }
  }
}

async function importHelloFresh() {
  const db = betterSqlite3(
    path.resolve(DATA_DIR, "db.db") /*, { verbose: console.log }*/
  );
  db.pragma("synchronous = 0");
  db.pragma("journal_mode = WAL");

  addHelperMethods(db);

  const { RECIPE_DIR } = process.env;

  const recipeFiles = fs.readdirSync(path.resolve(RECIPE_DIR));

  for (const recipe of recipeFiles) {
    console.log(recipe);
    await importRecipe(require(path.resolve(RECIPE_DIR, recipe)), db);
  }
}

async function main() {
  const dataMigrator = migrator.useDataDir(DATA_DIR);
  await dataMigrator.migrate();

  await importHelloFresh();
}

main().catch(console.error);
