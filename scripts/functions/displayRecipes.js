import { createRecipeCard } from "../template/createRecipeCard.js";
export const displayRecipes = (filteredRecipes) => {
  const recipesList = document.querySelector(".recipes-list");
  filteredRecipes.forEach((recipe) => {
    const newRecipe = createRecipeCard(recipe);
    recipesList.appendChild(newRecipe);
  });
};
