import { fetchRecipes } from "./api/fetchRecipes.js";
import { filterRecipes } from "./functions/filterRecipes.js";
import { toggleFilter } from "./handlers/toggleFiltersMenus.js";

async function init() {
  const recipes = await fetchRecipes();
  filterRecipes(recipes);
  toggleFilter();
}

init();
