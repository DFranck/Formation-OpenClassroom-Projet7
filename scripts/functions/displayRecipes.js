export const displayRecipes = (filteredRecipes) => {
  const recipesList = document.querySelector(".recipes-list");
  filteredRecipes.forEach((recipe) => {
    const { description, image, ingredients, name, time } = recipe;
    const newRecipe = document.createElement("li");
    newRecipe.setAttribute("class", "recipe-container");
    const recipeImg = document.createElement("img");
    const imgSRC = `../assets/img/${image}`;
    recipeImg.setAttribute("src", imgSRC);
    const recipeTime = document.createElement("span");
    recipeTime.textContent = time + "min";
    const recipeInfos = document.createElement("div");
    recipeInfos.setAttribute("class", "recipe-content");
    const recipeName = document.createElement("h4");
    recipeName.textContent = name;
    const titleRecette = document.createElement("h5");
    titleRecette.textContent = "RECETTE";
    const recipeDescription = document.createElement("p");
    recipeDescription.textContent = description;
    const titleIngredients = document.createElement("h5");
    titleIngredients.textContent = "INGREDIENTS";
    const recipeIngredients = document.createElement("div");
    recipeIngredients.setAttribute("class", "ingredients");
    recipesList.appendChild(newRecipe);
    newRecipe.appendChild(recipeImg);
    newRecipe.appendChild(recipeTime);
    newRecipe.appendChild(recipeInfos);
    recipeInfos.appendChild(recipeName);
    recipeInfos.appendChild(titleRecette);
    recipeInfos.appendChild(recipeDescription);
    recipeInfos.appendChild(titleIngredients);
    recipeInfos.appendChild(recipeIngredients);
    ingredients.forEach((ingredientContent) => {
      const { ingredient, quantity, unit } = ingredientContent;
      const ingredientinfo = document.createElement("div");
      ingredientinfo.setAttribute("class", "ingredient");
      const recipeIngredient = document.createElement("h6");
      recipeIngredient.textContent = ingredient;
      const recipeQuantity = document.createElement("p");
      unit
        ? (recipeQuantity.textContent = quantity + unit)
        : (recipeQuantity.textContent = quantity);
      recipeIngredients.appendChild(ingredientinfo);
      ingredientinfo.appendChild(recipeIngredient);
      ingredientinfo.appendChild(recipeQuantity);
    });
  });
};
