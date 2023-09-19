import { displayFiltersMenu } from "./displayFiltersMenus.js";
import { displayRecipes } from "./displayRecipes.js";

export const filterRecipes = (recipes) => {
  const filteredRecipes = recipes;
  console.log(filteredRecipes);
  displayRecipes(filteredRecipes);
  displayFiltersMenu(filteredRecipes);
};
