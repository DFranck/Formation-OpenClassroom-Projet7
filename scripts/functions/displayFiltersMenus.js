import { createFilterMenu } from "../template/createFilterMenu.js";

export function displayFiltersMenu(recipes) {
  const FiltersMenus = document.querySelectorAll(".custom-select ul");
  let allIngredients = [];
  let allDevices = [];
  let allUtensils = [];
  FiltersMenus.forEach((menu) => (menu.innerHTML = ""));
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
}
