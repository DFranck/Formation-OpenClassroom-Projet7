import { createRecipeCard } from "../template/createRecipeCard.js";

export const displayRecipes = (filteredRecipes) => {
  const recipesList = document.querySelector(".recipes-list");
  const recepesNumber = document.querySelector('.recipe-number')
  const inputValue = document
    .getElementById("searchBarInput")
    .value.trim()
    .toLowerCase();
  let newRecipe
  recipesList.innerHTML=''
  recepesNumber.innerText= `${filteredRecipes.length} recettes`
  if (filteredRecipes.length===0){
    newRecipe = document.createElement('h2')
    newRecipe.innerText=`Aucune recette ne contient ${inputValue} `
    recipesList.appendChild(newRecipe);
  }else{
  filteredRecipes.forEach((recipe) => {
      newRecipe = createRecipeCard(recipe);
      recipesList.appendChild(newRecipe);
    })
  };
};
