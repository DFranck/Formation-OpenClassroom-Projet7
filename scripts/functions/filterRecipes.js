import { displayFiltersMenu } from "./displayFiltersMenus.js";
import { displayRecipes } from "./displayRecipes.js";
import { fetchRecipes } from "../api/fetchRecipes.js";
let recipes = [];
const inputSearch = document.getElementById("searchBar");
const filterMenu = document.querySelectorAll(".custom-select ul");
const recipesList = document.querySelector(".recipes-list");
const newEvent = new Event("filterChange");
let isInputFilter = false;
let isBtnFilter = false;
let inputValue = "";
//Functions
function refreshBtnList(btnList) {
  btnList.forEach((btn) => {
    btn.removeEventListener("click", onBtnClick);
  });
  btnList.forEach((btn) => {
    btn.addEventListener("click", onBtnClick);
  });
}
function onBtnClick() {
  document.dispatchEvent(newEvent);
}
export async function filterRecipes() {
  if (recipes.length === 0) {
    recipes = await fetchRecipes("../../data/recipes.js");
  }
  let btnList = [
    ...document.querySelectorAll(".filter .filter-selected button"),
  ];
  btnList.length === 0 ? (isBtnFilter = false) : (isBtnFilter = true);
  let filteredRecipes = [];
  if (isBtnFilter && isInputFilter) {
    let filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const appliances = recipes[i].appliance.toLowerCase();
      const ingredientsList = recipes[i].ingredients;
      const ustensilsList = recipes[i].ustensils
      let matchCount = 0
      let j = 0;
      while (j < btnList.length) {
        if (appliances.includes(btnList[j].id.toLowerCase())) {
          matchCount ++;
        }
        j++;
      }
      for (let i = 0; i < ingredientsList.length; i++) {
        const ingredients = ingredientsList[i].ingredient.toLowerCase();
        let j = 0;
        while (j < btnList.length) {
          if (ingredients.includes(btnList[j].id.toLowerCase())) {
            matchCount ++;
          }
          j++;
        }
      }
      for (let i = 0; i < ustensilsList.length; i++) {
        const ustensils = ustensilsList[i].toLowerCase();
        let j = 0;
        while (j<btnList.length) {
          if (ustensils.includes(btnList[j].id.toLowerCase())){
            matchCount ++
          }
          j++
        }
      }
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
      if (matchCount===btnList.length&&(namesMatch || ingredientsMatch || descriptionsMatch)) filteredRecipes.push(recipes[i]);
    }
    displayFiltersMenu(filteredRecipes);
    displayRecipes(filteredRecipes);
    console.log(filteredRecipes,'both filter');
    if (filteredRecipes.length===0){
      let noRecipeMsg = document.createElement('h2')
        noRecipeMsg.innerText = `Aucune recette ne contient ${inputValue} `
        recipesList.appendChild(noRecipeMsg)
      }
  } else if (isBtnFilter && !isInputFilter) {
    let filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const appliances = recipes[i].appliance.toLowerCase();
      const ingredientsList = recipes[i].ingredients;
      const ustensilsList = recipes[i].ustensils
      let matchCount = 0
      let j = 0;
      while (j < btnList.length) {
        if (appliances.includes(btnList[j].id.toLowerCase())) {
          matchCount ++;
        }
        j++;
      }
      for (let i = 0; i < ingredientsList.length; i++) {
        const ingredients = ingredientsList[i].ingredient.toLowerCase();
        let j = 0;
        while (j < btnList.length) {
          if (ingredients.includes(btnList[j].id.toLowerCase())) {
            matchCount ++;
          }
          j++;
        }
      }
      for (let i = 0; i < ustensilsList.length; i++) {
        const ustensils = ustensilsList[i].toLowerCase();
        let j = 0;
        while (j<btnList.length) {
          if (ustensils.includes(btnList[j].id.toLowerCase())){
            matchCount ++
          }
          j++
        }
      }
      if (matchCount===btnList.length) filteredRecipes.push(recipes[i]);
    }
    displayFiltersMenu(filteredRecipes);
    displayRecipes(filteredRecipes);
    console.log(filteredRecipes,'btn filter');
  } else if (!isBtnFilter && isInputFilter) {
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
        filteredRecipes.push(recipes[i]);
    }
    displayFiltersMenu(filteredRecipes);
    displayRecipes(filteredRecipes);
    console.log(filteredRecipes,'input filter');
    if (filteredRecipes.length===0){
      let noRecipeMsg = document.createElement('h2')
        noRecipeMsg.innerText = `Aucune recette ne contient ${inputValue} `
        recipesList.appendChild(noRecipeMsg)
      }
  } else {
    console.log('no filter');
    displayFiltersMenu(recipes);
    displayRecipes(recipes);
  }
  refreshBtnList(btnList);
}
//EVENTS
inputSearch.addEventListener("input", (e) => {
  if (e.target.value.length > 2) {
    isInputFilter = true;
    inputValue = e.target.value.trim();
    document.dispatchEvent(newEvent);
  } else {
    isInputFilter = false;
    document.dispatchEvent(newEvent);
  }
});
filterMenu.forEach((li) => {
  li.addEventListener("click", () => {
    document.dispatchEvent(newEvent);
  });
});
document.addEventListener("filterChange", () => {
  filterRecipes();
});
