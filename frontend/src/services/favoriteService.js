import config from "../config/config";

export const getFavoritesByUser = async (userId) => {
  const response = await fetch(
    `${config.baseURL}/getFavoritesByUser/${userId}`
  );

  if (!response.ok) {
    throw new Error("Error fetching favorites");
  }

  return await response.json();
};

export const getFavoritesByRecipe = async (id) => {
  const response = await fetch(`${config.baseURL}/getFavoritesByRecipe/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch favorite status");
  }
  return response.json();
};

export const addFavorite = async (favorite) => {
  const response = await fetch(`${config.baseURL}/addFavorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  });
  if (!response.ok) {
    throw new Error("Failed to add favorite");
  }
};

export const removeFavorite = async (favorite) => {
  const response = await fetch(`${config.baseURL}/removeFavorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  });
  if (!response.ok) {
    throw new Error("Failed to remove favorite");
  }
};
