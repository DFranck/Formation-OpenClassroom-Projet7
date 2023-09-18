import { fetchRecipes } from "./functions/fetchRecipes.js";
import { filterRecipes } from "./functions/filterRecipes.js";
import { toggleFilter } from "./functions/toggleFiltersMenus.js";
async function init() {
  const recipes = await fetchRecipes();
  filterRecipes(recipes);
  toggleFilter();
  console.log(recipes);
}

init();
