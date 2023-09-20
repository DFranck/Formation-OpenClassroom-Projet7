import { displayFiltersMenu } from "./displayFiltersMenus.js";
import { displayRecipes } from "./displayRecipes.js";

//FILTRE BOUCLES NATIVES
export const filterRecipes = (recipes) => {
  const inputToFilter = document.querySelector("#searchBar input");
  const recipesList = document.querySelector(".recipes-list");
  inputToFilter.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredRecipes = [];
    if (searchTerm.length >= 3 && searchTerm.trim() !== "") {
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if (recipe.name.toLowerCase().includes(searchTerm)) {
          filteredRecipes.push(recipe);
        } else {
          for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j].ingredient;
            const description = recipe.description;
            if (ingredient.toLowerCase().includes(searchTerm)) {
              filteredRecipes.push(recipe);
              break;
            } else if (description.toLowerCase().includes(searchTerm)) {
              filteredRecipes.push(recipe);
              break;
            }
          }
        }
      }
      recipesList.innerHTML = "";
      displayRecipes(filteredRecipes);
      displayFiltersMenu(filteredRecipes);
    }
    if (
      searchTerm.length > 2 &&
      filteredRecipes.length === 0 &&
      searchTerm.trim() !== ""
    ) {
      recipesList.innerHTML = "";
      const li = document.createElement("li");
      li.innerText = `Aucune recette ne contient ${searchTerm}`;
      recipesList.appendChild(li);
    }
    if (searchTerm.length <= 2) {
      recipesList.innerHTML = "";
      displayRecipes(recipes);
      displayFiltersMenu(recipes);
    }
  });
  displayRecipes(recipes);
  displayFiltersMenu(recipes);
};
