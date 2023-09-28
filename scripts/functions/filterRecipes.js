import { displayFiltersMenu } from "./displayFiltersMenus.js";
import { displayRecipes } from "./displayRecipes.js";
import { fetchRecipes } from "../api/fetchRecipes.js";
const filterEvent = new Event("filterChange");
const inputToFilter = document.querySelector("#searchBar input");
const filterMenuUl = document.querySelectorAll(".custom-select ul");
let isInputFilter = false;
let inputValue = "";
let recipes = null;
export async function filterRecipes() {
  if (!recipes) {
    recipes = await fetchRecipes();
  }
  let btnList = [
    ...document.querySelectorAll(".filter .filter-selected button"),
  ];
  let isBtnFilter = btnList.length > 0;
  let filteredRecipes = [];
  if (isInputFilter && !isBtnFilter) {
    filteredRecipes = recipes.filter((recipe) => {
      const nameMatch = recipe.name.toLowerCase().includes(inputValue);
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(inputValue);
      const ingredientMatch = recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(inputValue)
      );
      return nameMatch || descriptionMatch || ingredientMatch;
    });
    displayRecipes(filteredRecipes);
    displayFiltersMenu(filteredRecipes);
    // console.log("filtre input only", filteredRecipes);
  } else if (isBtnFilter && !isInputFilter) {
    filteredRecipes = recipes.filter((recipe) => {
      return btnList.every((btn) => {
        const applianceMatch = recipe.appliance.includes(btn.id);
        const ustensilsMatch = recipe.ustensils.some((ust) =>
          ust.includes(btn.id)
        );
        const ingredientsMatch = recipe.ingredients.some((ing) =>
          ing.ingredient.includes(btn.id)
        );
        return applianceMatch || ustensilsMatch || ingredientsMatch;
      });
    });
    displayRecipes(filteredRecipes);
    displayFiltersMenu(filteredRecipes);
    // console.log("filtre btn only", filteredRecipes);
  } else if (isInputFilter && isBtnFilter) {
    filteredRecipes = recipes.filter((recipe) => {
      const nameMatch = recipe.name.toLowerCase().includes(inputValue);
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(inputValue);
      return btnList.every((btn) => {
        const applianceMatch = recipe.appliance.includes(btn.id);
        const ustensilsMatch = recipe.ustensils.some((ust) =>
          ust.includes(btn.id)
        );
        const ingredientsMatch = recipe.ingredients.some((ing) =>{
          ing.ingredient.toLowerCase().includes(inputValue)||ing.ingredient.includes(btn.id)
        }
        );
        return nameMatch || descriptionMatch && applianceMatch || ustensilsMatch || ingredientsMatch;
      });
    });
    displayRecipes(filteredRecipes);
    displayFiltersMenu(filteredRecipes);
    // console.log("filtre input+btn", filteredRecipes);
  } else if (!isBtnFilter && !isInputFilter) {
    displayRecipes(recipes);
    displayFiltersMenu(recipes);
  }
  btnList.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.dispatchEvent(filterEvent);
      
    });
  });
}
document.addEventListener("filterChange", function () {
  filterRecipes();
});
inputToFilter.addEventListener("input", (e) => {
  const inputLength = e.target.value.length;
  if (inputLength > 2) {
    inputValue = e.target.value;
    isInputFilter = true;
    document.dispatchEvent(filterEvent);
  } else {
    isInputFilter = false;
    document.dispatchEvent(filterEvent);
  }
});

filterMenuUl.forEach((ul) => {
  ul.addEventListener("click", () => {
    document.dispatchEvent(filterEvent);
  });
});
