const process = require("process");
const path = require("path");
const recipes = require("./data/recipes");

const AISLE_MAP = {
  Turmeric: "Spices",
  "Pepper (vegetable)": "Produce",
  Cumin: "Spices",
  "Asian spices": "Spices",
  "Cilantro/Coriander": "Herbs",
  Lemon: "Produce",
  Potatoes: "Produce",
  Onion: "Produce",
  "Olive oil": "Oil",
  Butter: "Dairy",
  Salt: "Spices",
  "Pepper (spice)": "Spices",
  Kale: "Produce",
  "Mediteranean spices": "Spices",
  Chicken: "Meat",
  "Gruyère cheese": "Dairy",
  "Chili (spice)": "Spices",
  Carrot: "Produce",
  Ginger: "Produce",
  Beef: "Meat",
  Panko: "Baking",
  Cream: "Dairy",
  Mushrooms: "Produce",
  Vinegar: "Baking",
  "Sesame Oil": "Oil",
  "Green peas": "Produce",
  Sugar: "Baking",
  Rosemary: "Herbs",
  Pork: "Meat",
  "Asian greens": "Produce",
  Jelly: "Baking",
  "Chili sauce": "Sauce",
  "Sesame seeds": "Spices",
  "Green Beans": "Produce",
  "Garlic powder": "Spices",
  Flour: "Baking",
  Zucchini: "Produce",
  Tomatoes: "Produce",
  Couscous: "Grains",
  Rice: "Grains",
  Paprika: "Spices",
  Garlic: "Produce",
  Thyme: "Herbs",
  Asparagus: "Produce",
  Chickpeas: "Grains",
  Eggs: "Produce",
  "Peppermint Tea": "Tea",
  "Sleepytime Tea": "Tea",
  Chapstick: "Pharmacy",
  "Dark Chocolate": "Snack",
  "Cosmic Cranberry Kombucha": "Produce",
  Pineapple: "Produce",
};

const KNOWN_AISLES = [
  "Pharmacy",
  "Dairy",
  "Meat",
  "Grains",
  "Tea",
  "Snack",
  "Nuts",
  "Baking",
  "Spices",
  "Oil",
  "Stock",
  "Sauce",
  "Bread",
  "Produce",
  "Herbs",
];

function getAisle(ingredient) {
  const raw =
    ingredient.ingredient.family || ingredient.ingredient.name || "unknown";

  const mapped = AISLE_MAP[raw] || raw;

  if (!KNOWN_AISLES.includes(mapped)) {
    console.warn("UNKNOWN AISLE: " + mapped);
  }

  return mapped;
}

function mergeQuantities(additional, current) {
  const currentList = current || [];

  const existingEntry = currentList.find((e) => e.unit === additional.unit) || {
    amount: 0,
    unit: additional.unit,
  };

  return [
    ...currentList.filter((entry) => entry.unit !== additional.unit),
    {
      amount: existingEntry.amount + additional.amount,
      unit: additional.unit,
    },
  ];
}

function makeShoppingList(plan) {
  const shoppingList = {};

  for (const meal of plan.meals) {
    if (recipes[meal].ingredients.length === 0) {
      console.error(`${meal} listed no ingredients`);
    }
    for (const ingredient of recipes[meal].ingredients) {
      const aisle = getAisle(ingredient);

      if (!shoppingList[aisle]) {
        shoppingList[aisle] = {};
      }

      shoppingList[aisle][ingredient.ingredient.name] = mergeQuantities(
        ingredient,
        shoppingList[aisle][ingredient.ingredient.name]
      );
    }
  }

  for (const [ingredient, quantities] of Object.entries(plan.ingredients)) {
    const aisle = getAisle({ ingredient: { name: ingredient } });

    if (!shoppingList[aisle]) {
      shoppingList[aisle] = {};
    }

    shoppingList[aisle][ingredient] = mergeQuantities(
      quantities,
      shoppingList[aisle][ingredient]
    );
  }

  return shoppingList;
}

function render(list) {
  const orderIn = (arr) => (a, b) => arr.indexOf(a) - arr.indexOf(b);
  const alphabetically = (a, b) => a.localeCompare(b);
  const sortKeys = (obj, comparator) =>
    Object.keys(obj)
      .sort(comparator)
      .reduce((newObj, key) => {
        newObj[key] = obj[key];
        return newObj;
      }, {});

  const mapValues = (fn, obj) =>
    Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]));

  function renderQuantity(quantity) {
    return (
      quantity
        .filter((q) => q.amount !== 0)
        .map((q) => `${q.amount} ${q.unit}`)
        .join(" + ") || "unitless"
    );
  }

  const sorted = mapValues(
    (value) => sortKeys(value, alphabetically),
    sortKeys(list, orderIn(KNOWN_AISLES))
  );

  const out = [];
  for (const [aisle, items] of Object.entries(sorted)) {
    out.push(`${aisle}:`);
    for (const [item, quantity] of Object.entries(items)) {
      out.push(`    ${item}: ${renderQuantity(quantity)}`);
    }
  }

  return out.join("\n");
}

function main() {
  const planFilename = process.argv[2];

  const plan = require(path.resolve(planFilename));

  console.log(render(makeShoppingList(plan)));
}

main();
