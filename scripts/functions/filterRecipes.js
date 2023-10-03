import { displayFiltersMenu } from "./displayFiltersMenus.js";
import { displayRecipes } from "./displayRecipes.js";
import { fetchRecipes } from "../api/fetchRecipes.js";
// La fonction filter a une complexité de O(n) pour chaque appel.
// La fonction some a une complexité de O(n) dans le pire des cas (lorsqu'aucun élément ne correspond).
// La fonction has pour un Set a une complexité moyenne de O(1).
// En supposant que m est le nombre de boutons, n est le nombre de recettes, et p est le nombre moyen d'ingrédients et d'ustensiles par recette :

// La complexité totale est approximativement :
// O(n) * (O(1) + O(p) * O(m) + O(p) * O(m)) = O(n * (1 + 2pm))
export async function filterRecipes() {
  const recipes = await fetchRecipes("../../data/recipes.js");
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
  console.log(filteredRecipes);
  console.log(btnList, btnSet);

  displayRecipes(filteredRecipes);
  displayFiltersMenu(filteredRecipes);
}
