export const arrayOfSize = (n) => {
  const o = [];
  for (var i = 0; i < n; i++) {
    o.push(i);
  }
  return o;
};

export const groupByType = (plan) => {
  const breakfasts = plan.meals.filter((meal) => meal.type === "Breakfast");
  const lunches = plan.meals.filter((meal) => meal.type === "Lunch");
  const dinners = plan.meals.filter((meal) => meal.type === "Dinner");
  const snacks = plan.meals.filter((meal) => meal.type === "Snack");

  return {
    ...plan,
    breakfasts,
    lunches,
    dinners,
    snacks,
    breakfastPlaceholders: Math.max(plan.breakfastSlots - breakfasts.length, 0),
    lunchPlaceholders: Math.max(plan.lunchSlots - lunches.length, 0),
    dinnerPlaceholders: Math.max(plan.dinnerSlots - dinners.length, 0),
  };
};
