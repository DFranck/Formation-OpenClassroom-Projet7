import { displayFiltersMenu } from "./displayFiltersMenus.js";
import { displayRecipes } from "./displayRecipes.js";
import { fetchRecipes } from "../api/fetchRecipes.js";
let recipes = []
const inputSearch = document.getElementById('searchBar')
const filterMenu = document.querySelectorAll('.custom-select ul')
const filterBtn = document.querySelector('.filterBtn button')
const newEvent = new Event('filterChange')
let isBtnFilter = false
let isInputFilter = false
document.addEventListener('filterChange', filterRecipes)
export async function filterRecipes() {
 if(recipes.length===0){
  recipes=await fetchRecipes('../../data/recipes.js')
 } 
 console.log(filterBtn);
 if(isBtnFilter&&isInputFilter){
  console.log("filtre btn + input");
 } else if (isBtnFilter&&!isInputFilter){
  console.log("je filtre btn only");
 } else if(!isBtnFilter&& isInputFilter){
  console.log('filtre input only');
 } else {
  console.log('no filter');
   displayFiltersMenu(recipes)
   displayRecipes(recipes)
  }
}
inputSearch.addEventListener('input',(e)=>{
  if(e.target.value.length>2){
    isInputFilter = true
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
