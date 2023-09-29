import { displayFiltersMenu } from "./displayFiltersMenus.js";
import { displayRecipes } from "./displayRecipes.js";
import { fetchRecipes } from "../api/fetchRecipes.js";

export async function filterRecipes() {
  let recipes = [];
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
  if (recipes.length === 0) {
    recipes = await fetchRecipes("../../data/recipes.js");
  }
  if (btnList.length > 0) {
    for (let i = 0; i < recipes.length; i++) {
      appliances = recipes[i].appliance.toLowerCase();
      ingredientsList = recipes[i].ingredients;
      ustensilsList = recipes[i].ustensils;
      let matchCount = 0;
      let j = 0;
      while (j < btnList.length) {
        if (appliances.includes(btnList[j].id.toLowerCase())) {
          matchCount++;
        }
        j++;
      }
      for (let i = 0; i < ingredientsList.length; i++) {
        const ingredients = ingredientsList[i].ingredient.toLowerCase();
        let j = 0;
        while (j < btnList.length) {
          if (ingredients.includes(btnList[j].id.toLowerCase())) {
            matchCount++;
          }
          j++;
        }
      }
      for (let i = 0; i < ustensilsList.length; i++) {
        const ustensils = ustensilsList[i].toLowerCase();
        let j = 0;
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
      const namesMatch = recipes[i].name
        .toLowerCase()
        .includes(inputValue.toLowerCase());
      const descriptionsMatch = recipes[i].description
        .toLowerCase()
        .includes(inputValue.toLowerCase());
      const ingredients = recipes[i].ingredients;
      let ingredientsMatch = false;
      for (let i = 0; i < ingredients.length; i++) {
        const ingredientMatch = ingredients[i].ingredient
          .toLowerCase()
          .includes(inputValue.toLowerCase());
        if (ingredientMatch) ingredientsMatch = true;
      }
      if (namesMatch || ingredientsMatch || descriptionsMatch)
        filteredRecipesByInput.push(recipes[i]);
    }
  }
  if (filteredRecipesByBtn.length > 0 && filteredRecipesByInput.length > 0) {
    filteredRecipes = filteredRecipesByBtn.filter((recipe) =>
      filteredRecipesByInput.includes(recipe)
    );
  } else if (filteredRecipesByBtn.length > 0) {
    filteredRecipes = filteredRecipesByBtn;
  } else if (filteredRecipesByInput.length > 0) {
    filteredRecipes = filteredRecipesByInput;
  } else {
    filteredRecipes = recipes;
  }
  displayRecipes(filteredRecipes);
  displayFiltersMenu(filteredRecipes);
}
