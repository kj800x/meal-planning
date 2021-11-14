const path = require("path");
const fs = require("fs");
const process = require("process");

async function importRecipe(recipe, db) {
  const ingredientMap = {};
  recipe.ingredients.forEach((i) => {
    ingredientMap[i.id] = {
      id: i.id,
      name: i.name,
      family: i.family?.name,
    };
  });

  console.log(recipe.yields);

  return {
    name: recipe.name,
    prepTime: recipe.prepTime,
    description: recipe.description,
    // cardLink: recipe.cardLink,
    // websiteUrl: recipe.websiteUrl,
    // nutrition: recipe.nutrition,
    // allergens: recipe.allergens,
    // utensils: recipe.utensils,
    // cuisines: recipe.cuisines,
    ingredients: recipe.yields
      .find((iy) => iy.yields === 2)
      ?.ingredients.map((ingredient) => ({
        yields: 2,
        ingredient: ingredientMap[ingredient.id],
        amount: ingredient.amount,
        unit: ingredient.unit,
      })),
  };
}

async function importHelloFresh() {
  const { RECIPE_DIR } = process.env;

  const recipeFiles = fs.readdirSync(path.resolve(RECIPE_DIR));

  const recipes = {};

  for (const recipe of recipeFiles) {
    const parsedRecipe = await importRecipe(
      require(path.resolve(RECIPE_DIR, recipe))
    );
    recipes[parsedRecipe.name] = parsedRecipe;
  }

  fs.writeFileSync("./data/recipes.json", JSON.stringify(recipes, null, 2));
}

async function main() {
  await importHelloFresh();
}

main().catch(console.error);
