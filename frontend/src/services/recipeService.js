import config from "../config/config";

export const getRecipes = async () => {
  const response = await fetch(`${config.baseURL}/getRecipes`);

  if (!response.ok) {
    throw new Error("Error fetching recipes");
  }

  return await response.json();
};

export const addNewRecipe = async (recipe) => {
  const response = await fetch(`${config.baseURL}/addNewRecipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error("Error adding new recipe");
  }

  return await response.json();
};

export const getRecipesByUser = async (userId) => {
  const response = await fetch(`${config.baseURL}/getRecipesByUser/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch recipes by user");
  }
  return response.json();
};

export const deleteRecipeById = async (recipeId) => {
  const response = await fetch(
    `${config.baseURL}/deleteRecipeByID/${recipeId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete recipe");
  }
};

export const updateRecipeById = async (recipeId, updateRecipe) => {
  const response = await fetch(
    `${config.baseURL}/updateRecipeById/${recipeId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateRecipe),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update recipe");
  }
};

export const getRecipeDetails = async (id) => {
  const response = await fetch(`${config.baseURL}/getRecipeDetails/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch recipe details");
  }
  return response.json();
};
