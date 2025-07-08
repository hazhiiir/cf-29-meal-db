function showRandomMeal() {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(function (response) {
      const formattedMeal = formatMeal(response.data.meals[0]);
      renderMeal(formattedMeal, "#meal");
    });
}

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
function renderInstruction(instruction, index) {
  return `
    <div class="flex gap-4">
      <div
        class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm"
      >
        ${index}
      </div>
      <p class="text-gray-700 leading-relaxed pt-1">
        ${instruction}
      </p>
    </div>
  `;
}
function renderInstructions(instructions) {
  return `
  <div
    class="rounded-lg bg-card text-card-foreground mt-8 shadow-lg border-0 bg-white"
  >
    <div
      class="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white"
    >
      <h3 class="font-semibold leading-none tracking-tight text-xl">
        Cooking Instructions
      </h3>
    </div>
    <div class="p-6">
      <div class="space-y-4">
        ${instructions
          .map(function (ins, index) {
            return renderInstruction(ins, index + 1);
          })
          .join("\n")}
      </div>
    </div>
  </div>
  `;
}
function renderWatchYoutube(link) {
  return `
  <div
    class="rounded-lg bg-card text-card-foreground shadow-lg border-0 bg-white"
  >
    <div class="p-6">
      <a
        href="${link}"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-colors duration-300"
      >
        <svg
          class="w-6 h-6 mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
          />
        </svg>
        Watch Video Tutorial
      </a>
    </div>
  </div>
  `;
}
function renderIng(ing) {
  return `
  <div
    class="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
  >
    <span class="text-gray-700 font-medium">${ing.name}</span>
    <span
      class="text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-sm"
    >
      ${ing.measure}
    </span>
  </div>`;
}

function renderIngs(ings) {
  return `
  <div
    class="rounded-lg bg-card text-card-foreground shadow-lg border-0 bg-white"
  >
    <div
      class="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white"
    >
      <h3 class="font-semibold leading-none tracking-tight text-xl">
        Ingredients
      </h3>
    </div>
    <div class="p-6">
      <div class="space-y-3">
        ${ings.map(renderIng).join("\n")}
      </div>
    </div>
  </div>
  `;
}

function renderTags(tags) {
  return tags
    .map(function (tag) {
      return `<div
      class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 bg-yellow-500 hover:bg-yellow-600 text-white"
    >
    ${tag}
    </div>`;
    })
    .join("\n");
}

function renderOverView(name, thumb, category, area, tags) {
  return `
      <div
        class="rounded-lg bg-card text-card-foreground overflow-hidden shadow-lg border-0 bg-white"
      >
        <div class="relative">
          <img
            src="${thumb}"
            alt="${name}"
            class="w-full h-80 object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          ></div>
          <div class="absolute bottom-4 left-4 right-4">
            <h2 class="text-2xl font-bold text-white mb-2">${name}</h2>
            <div class="flex flex-wrap gap-2">
              <div
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 bg-orange-500 hover:bg-orange-600 text-white"
              >
                ${category}
              </div>
              <div
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 bg-amber-500 hover:bg-amber-600 text-white"
              >
                ${area}
              </div>
              ${renderTags(tags)}
            </div>
          </div>
        </div>
      </div>
  `;
}

function renderMeal(meal, targetSelector) {
  if (!targetSelector) {
    return;
  }

  const targetEl = document.querySelector(targetSelector);

  if (!targetEl) {
    return;
  }
  const { name, thumb, category, area, tags, ings, youtube, instructions } =
    meal;
  const component = `
    <div class="grid lg:grid-cols-2 gap-8">
      <div class="space-y-6">
        ${renderOverView(name, thumb, category, area, tags)}
        <div
          class="rounded-lg bg-card text-card-foreground shadow-lg border-0 bg-white"
        >
          <div class="p-6">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div
                class="flex flex-col items-center p-4 bg-orange-50 rounded-lg"
              >
                <i
                  class="h-8 w-8 text-orange-500 mb-2"
                  data-lucide="clock"
                ></i>
                <span class="text-sm text-gray-600">Prep Time</span>
                <span class="font-semibold text-gray-900">30 min</span>
              </div>
              <div
                class="flex flex-col items-center p-4 bg-amber-50 rounded-lg"
              >
                <i
                  class="h-8 w-8 text-amber-500 mb-2"
                  data-lucide="users"
                ></i>
                <span class="text-sm text-gray-600">Servings</span>
                <span class="font-semibold text-gray-900">4 people</span>
              </div>
              <div
                class="flex flex-col items-center p-4 bg-yellow-50 rounded-lg"
              >
                <i
                  class="h-8 w-8 text-yellow-500 mb-2"
                  data-lucide="chef-hat"
                ></i>
                <span class="text-sm text-gray-600">Difficulty</span>
                <span class="font-semibold text-gray-900">Medium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-6">
        ${renderIngs(ings)}
        ${renderWatchYoutube(youtube)}
      </div>
    </div>
    ${renderInstructions(instructions)}
  `;
  targetEl.innerHTML = component;
  lucide.createIcons();
}

showRandomMeal();
