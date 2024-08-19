import config from "../config/config";

export const registerUser = async (user) => {
  const response = await fetch(`${config.baseURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Error registering user");
  }

  return await response.json();
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${config.baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Error logging in");
  }

  return await response.json();
};

export const checkUsernameExists = async (username) => {
  const response = await fetch(`${config.baseURL}/checkUsername/${username}`);

  if (!response.ok) {
    throw new Error("Error checking username");
  }

  const result = await response.json();
  return result.exists;
};

export const getUsers = async () => {
  const response = await fetch(`${config.baseURL}/getUsers`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const deleteUserById = async (userId) => {
  const response = await fetch(`${config.baseURL}/deleteUserByID/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
};

export const updateUserById = async (userId, updateUser) => {
  const response = await fetch(`${config.baseURL}/updateUserById/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateUser),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
};
