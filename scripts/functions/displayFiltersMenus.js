import { createFilterMenu } from "../template/createFilterMenu.js";

export function displayFiltersMenu(recipes) {
  const FiltersMenus = document.querySelectorAll(".custom-select ul");
  let allIngredients = [];
  let allDevices = [];
  let allUtensils = [];
  recipes.forEach((recipe) => {
    const { ingredients, appliance, ustensils } = recipe;
    allIngredients = allIngredients.concat(
      ingredients.map((ing) => ing.ingredient)
    );
    allDevices = allDevices.concat(appliance);
    allUtensils = allUtensils.concat(ustensils);
  });
  allIngredients = [...new Set(allIngredients)];
  allDevices = [...new Set(allDevices)];
  allUtensils = [...new Set(allUtensils)];
  FiltersMenus.forEach((menu) => {
    const thisMenu = menu.className;
    if (thisMenu === "ingredients") {
      createFilterMenu(thisMenu, allIngredients);
    } else if (thisMenu === "devices") {
      createFilterMenu(thisMenu, allDevices);
    } else if (thisMenu === "utensils") {
      createFilterMenu(thisMenu, allUtensils);
    }
  });
  const listOfFilter = document.querySelectorAll('.list-filter')
  const filterSelected = document.querySelector('.filter-selected')
    listOfFilter.forEach((item)=>{
        item.addEventListener('click',(e)=>{
            const btnText = e.target.textContent.trim()
            const isFilterBtn = document.getElementById(btnText)
            if(isFilterBtn){
              isFilterBtn.remove()
            } else {
              const newBtn = document.createElement('button');
              const newImg = document.createElement('img');
              newImg.setAttribute('src',"./assets/icons/black-cross.svg")
              newBtn.textContent= btnText
              newBtn.setAttribute('class', "filterBtn")
              newBtn.setAttribute('id',btnText)
              newBtn.appendChild(newImg)
              filterSelected.appendChild(newBtn)
              newBtn.addEventListener('click',()=>{
                newBtn.remove()
                })
              }
            })
          })
          
        }
