import { displayFiltersMenu } from "./displayFiltersMenus.js";
import { displayRecipes } from "./displayRecipes.js";
import { fetchRecipes } from "../api/fetchRecipes.js";

// O(m + n * p) = O(nb de Btn + nb de recette * nb d'ingredients/ustensils)
let recipes= []

export async function filterRecipes() {

  console.time('filterRecipes performance');
//24ms fetch, 13ms 50 recipes, 1.5ms filter
  if (recipes.length===0){
    recipes = await fetchRecipes("../../data/recipes.js");
  }
  const btnList = [
    ...document.querySelectorAll(".filter .filter-selected button"),
  ];
  const btnSet = new Set(btnList.map((btn) => btn.id.toLowerCase()));
  const inputValue = document
    .getElementById("searchBarInput")
    .value.trim()
    .toLowerCase();
  const filteredRecipes = recipes.filter((recipe) => {
    if (inputValue.length >= 3) {
      const nameMatch = recipe.name.toLowerCase().includes(inputValue);
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(inputValue);
      const ingredientMatch = recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(inputValue)
      );
      if (!nameMatch || !descriptionMatch || !ingredientMatch) return false;
    }
    if (btnList.length > 0) {
      const applianceMatch = btnSet.has(recipe.appliance.toLowerCase());
      const ingredientMatch = recipe.ingredients.some((ing) =>
        btnSet.has(ing.ingredient.toLowerCase())
      );
      const ustensilsMatch = recipe.ustensils.some((ustensil) =>
        btnSet.has(ustensil.toLowerCase())
      );
      if (applianceMatch + ingredientMatch + ustensilsMatch < btnList.length)
        return false;
    }

    return true;
  });

  displayRecipes(filteredRecipes);
  displayFiltersMenu(filteredRecipes);

console.timeEnd('filterRecipes performance')
}
