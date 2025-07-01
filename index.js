function formatMeal(meal) {
  const {
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strTags,
    strYoutube,
  } = meal;

  const formatedInstructions = strInstructions
    .split("\n")
    .filter(function (value) {
      return value !== "\r";
    });
  const formatedTags = strTags ? strTags.split(",") : [];
  const ings = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      const ing = {};
      ing.name = meal[`strIngredient${i}`];
      ing.measure = meal[`strMeasure${i}`];
      ings.push(ing);
    }
  }

  return {
    name: strMeal,
    category: strCategory,
    area: strArea,
    thumb: strMealThumb,
    youtube: strYoutube,
    instructions: formatedInstructions,
    tags: formatedTags,
    ings: ings,
  };
}
