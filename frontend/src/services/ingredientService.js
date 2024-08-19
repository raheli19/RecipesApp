import config from "../config/config";

export const getAllIngredients = async () => {
  const response = await fetch(`${config.baseURL}/getAllIngredients`);

  if (!response.ok) {
    throw new Error("Error fetching ingredients");
  }

  return await response.json();
};

export const getIngredientsByRecipeId = async (recipeId) => {
  const response = await fetch(
    `${config.baseURL}/getIngredientsByRecipeId/${recipeId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch ingredients by recipe ID");
  }
  return response.json();
};
