import { createRecipeCard } from "../template/createRecipeCard.js";

export const displayRecipes = (filteredRecipes) => {
  const recipesList = document.querySelector(".recipes-list");
  const recepesNumber = document.querySelector('.recipe-number')
  recipesList.innerHTML=''
  recepesNumber.innerText= `${filteredRecipes.length} recettes`
  filteredRecipes.forEach((recipe) => {
    const newRecipe = createRecipeCard(recipe);
    recipesList.appendChild(newRecipe);
  });
};
