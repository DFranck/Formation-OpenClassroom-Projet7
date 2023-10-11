import { displayFiltersMenu } from "./displayFiltersMenus.js";
import { displayRecipes } from "./displayRecipes.js";
import { fetchRecipes } from "../api/fetchRecipes.js";

//O(n * (m + p * m + d * m + 1 + p)) = O( recettes * (btn + btn * ingrédients + btn * ustensils + input + recette))
let recipes = [];

export async function filterRecipes() {
  console.time("filterRecipes Performance");
  //20ms first fetch, 13ms 50recette, 3ms filter
  const btnList = [
    ...document.querySelectorAll(".filter .filter-selected button"),
  ];
  const inputValue = document.getElementById("searchBarInput").value.trim();
  const filteredRecipesByBtn = [];
  const filteredRecipesByInput = [];
  let appliances = "";
  let ingredientsList = "";
  let ustensilsList = "";
  let filteredRecipes = recipes;
  let j
  let ingredients
  let ustensils
  let namesMatch
  let descriptionsMatch
  let ingredientMatch
  let ingredientsMatch
  if (recipes.length === 0) {
    recipes = await fetchRecipes("../../data/recipes.js");
  }
  if (btnList.length > 0) {
    for (let i = 0; i < recipes.length; i++) {
      appliances = recipes[i].appliance.toLowerCase();
      ingredientsList = recipes[i].ingredients;
      ustensilsList = recipes[i].ustensils;
      let matchCount = 0;
      j = 0;
      while (j < btnList.length) {
        if (appliances.includes(btnList[j].id.toLowerCase())) {
          matchCount++;
        }
        j++;
      }
      for (let i = 0; i < ingredientsList.length; i++) {
        ingredients = ingredientsList[i].ingredient.toLowerCase();
        j = 0;
        while (j < btnList.length) {
          if (ingredients.includes(btnList[j].id.toLowerCase())) {
            matchCount++;
          }
          j++;
        }
      }
      for (let i = 0; i < ustensilsList.length; i++) {
        ustensils = ustensilsList[i].toLowerCase();
        j = 0;
        while (j < btnList.length) {
          if (ustensils.includes(btnList[j].id.toLowerCase())) {
            matchCount++;
          }
          j++;
        }
      }
      if (matchCount === btnList.length) filteredRecipesByBtn.push(recipes[i]);
    }
  }
  if (inputValue.length >= 3) {
    for (let i = 0; i < recipes.length; i++) {
      namesMatch = recipes[i].name
      .toLowerCase()
      .includes(inputValue.toLowerCase());
      descriptionsMatch = recipes[i].description
      .toLowerCase()
      .includes(inputValue.toLowerCase());
      ingredients = recipes[i].ingredients;
      for (let j = 0; j < ingredients.length; j++) {
        ingredientsMatch = false
        ingredientMatch = ingredients[j].ingredient
          .toLowerCase()
          .includes(inputValue.toLowerCase());
        if (ingredientMatch) ingredientsMatch = true;
      }
      if (namesMatch || ingredientsMatch || descriptionsMatch)
        filteredRecipesByInput.push(recipes[i]);
    }
  }
  if (filteredRecipesByBtn.length > 0 && filteredRecipesByInput.length > 0) {
    filteredRecipes = [];
    for (let i = 0; i < filteredRecipesByBtn.length; i++) {
      if(filteredRecipesByInput.includes(filteredRecipesByBtn[i])){
        filteredRecipes.push(filteredRecipesByBtn[i])
      };
    }
  } else if (filteredRecipesByBtn.length > 0 && inputValue.length<3) {
    filteredRecipes = filteredRecipesByBtn;
  } else if (filteredRecipesByInput.length > 0 && btnList.length===0) {
    filteredRecipes = filteredRecipesByInput;
  } else if (filteredRecipesByInput.length === 0 && inputValue.length > 2) {
    filteredRecipes = [];
  } else {
    filteredRecipes = recipes;
  }
  displayRecipes(filteredRecipes);
  displayFiltersMenu(filteredRecipes);

  console.timeEnd("filterRecipes Performance");
}
