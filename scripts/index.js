
import { filterRecipes } from "./functions/filterRecipes.js";
import { toggleFilter } from "./handlers/toggleFiltersMenus.js";

async function init() {
  filterRecipes();
  toggleFilter();
}

init();
