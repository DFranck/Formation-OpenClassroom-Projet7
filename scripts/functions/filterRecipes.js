import { displayFiltersMenu } from "./displayFiltersMenus.js";
import { displayRecipes } from "./displayRecipes.js";
import { fetchRecipes } from "../api/fetchRecipes.js";
let recipes = []
const inputSearch = document.getElementById('searchBar')
const filterMenu = document.querySelectorAll('.custom-select ul')
const newEvent = new Event('filterChange')
let isInputFilter = false
let isBtnFilter = false
let inputValue = ""
function refreshBtnList(btnList){
  btnList.forEach((btn) => {
    btn.removeEventListener('click', onBtnClick);
  });
  btnList.forEach((btn) => {
    btn.addEventListener('click', onBtnClick);
  });
}
function onBtnClick() {
  document.dispatchEvent(newEvent);
}
export async function filterRecipes() {
  if(recipes.length===0){
    recipes=await fetchRecipes('../../data/recipes.js')
  }
  let btnList = [...document.querySelectorAll('.filter .filter-selected button')]
 btnList.length===0? isBtnFilter=false : isBtnFilter = true
 let filteredRecipes=[]
 if(isBtnFilter&&isInputFilter){
  console.log("filtre btn + input");
  displayFiltersMenu(filteredRecipes)
  displayRecipes(filteredRecipes)
 } else if (isBtnFilter&&!isInputFilter){
  console.log("je filtre btn only");
  displayFiltersMenu(recipes)
  displayRecipes(recipes)
 } else if(!isBtnFilter&& isInputFilter){
  for (let i = 0; i < recipes.length; i++) {
    const appliancesMatch = recipes[i].appliance.toLowerCase().includes(inputValue.toLowerCase());
    const descriptionsMatch = recipes[i].description.toLowerCase().includes(inputValue.toLowerCase());
    const ingredients = recipes[i].ingredients;
    let ingredientsMatch = false
    for (let i = 0; i < ingredients.length; i++) {
      const ingredientMatch = ingredients[i].ingredient.toLowerCase().includes(inputValue.toLowerCase());
      if (ingredientMatch)ingredientsMatch=true;
    }
    const ustensilsMatch = recipes[i].ustensils;
    if(appliancesMatch,descriptionsMatch,ingredientsMatch)filteredRecipes.push(recipes[i]);
console.log(filteredRecipes);
  }
  console.log("filtre input Only");
  displayFiltersMenu(filteredRecipes)
  displayRecipes(filteredRecipes)
 } else {
  console.log('no filter');
   displayFiltersMenu(recipes)
   displayRecipes(recipes)
  }
  refreshBtnList(btnList)
}
inputSearch.addEventListener('input',(e)=>{
  if(e.target.value.length>2){
    isInputFilter = true
    inputValue=e.target.value.trim()
    document.dispatchEvent(newEvent)
  } else {
    isInputFilter = false
    document.dispatchEvent(newEvent)
  }
})
filterMenu.forEach((li)=>{
  li.addEventListener('click',()=>{
    document.dispatchEvent(newEvent)
  })
})
document.addEventListener('filterChange', ()=>{
  filterRecipes()
})
