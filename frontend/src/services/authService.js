export const registerUser = async (user) => {
  const response = await fetch("http://localhost:3001/register", {
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
  const response = await fetch("http://localhost:3001/login", {
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
  const response = await fetch(
    `http://localhost:3001/checkUsername/${username}`
  );

  if (!response.ok) {
    throw new Error("Error checking username");
  }

  const result = await response.json();
  return result.exists;
};
