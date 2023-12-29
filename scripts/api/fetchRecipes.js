export async function fetchRecipes() {
  const localStoreRecipes = localStorage.getItem("store-recipes");
  if (localStoreRecipes) {
    return JSON.parse(localStoreRecipes);
  } else {
    const responses = await import("../../data/recipes.js");
    const recipes = responses.default;
    localStorage.setItem("store-recipes", JSON.stringify(recipes));
    return recipes;
  }
}
