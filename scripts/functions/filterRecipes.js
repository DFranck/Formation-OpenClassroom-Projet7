import { displayFiltersMenu } from "./displayFiltersMenus.js";
import { displayRecipes } from "./displayRecipes.js";

export const filterRecipes = (recipes) => {
  //code a créer pour filtrer
  const filteredRecipes = recipes;
  displayRecipes(filteredRecipes);
  displayFiltersMenu(recipes);
};
