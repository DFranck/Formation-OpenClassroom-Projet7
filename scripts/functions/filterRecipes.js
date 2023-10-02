import { displayFiltersMenu } from "./displayFiltersMenus.js";
import { displayRecipes } from "./displayRecipes.js";
import { fetchRecipes } from "../api/fetchRecipes.js";

export async function filterRecipes() {
  const btnList = [...document.querySelectorAll(".filter .filter-selected button")];
  const inputValue = document.getElementById("searchBarInput").value.trim().toLowerCase();
  
  let recipes = await fetchRecipes("../../data/recipes.js");
  
  const btnSet = new Set(btnList.map((btn) => btn.id.toLowerCase()));
  console.log("btnSet", btnSet); // Log pour déboguer les IDs des boutons
  
  const filteredRecipes = recipes.filter((recipe) => {
    
    if (btnList.length > 0) {
      if (!btnSet.has(recipe.appliance.toLowerCase())) {
        return false;
      }
    }
    
    if (inputValue.length >= 3) {
      const nameMatch = recipe.name.toLowerCase().includes(inputValue);
      const descriptionMatch = recipe.description.toLowerCase().includes(inputValue);
      const ingredientMatch = recipe.ingredients.some((ing) => ing.ingredient.toLowerCase().includes(inputValue));
      
      if (!nameMatch && !descriptionMatch && !ingredientMatch) {
        return false;
      }
    }
    
    return true;
  });
  
  displayRecipes(filteredRecipes);
  displayFiltersMenu(filteredRecipes);
}

