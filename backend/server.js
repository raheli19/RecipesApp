const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());
const db = require("./database");
const PORT = process.env.port || 3001;
const path = require("path");
const saltRounds = 10;

app.use(bodyParser.json());


app.post("/register", (req, res) => {
  console.log(req.body);
  const { password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }

    db.insertUser(req.body, hash)
      .then((user) =>
        res.status(200).json({ message: "User registered successfully" , user})
      )
      .catch((err) => res.status(500).json({ error: "Error inserting user" }));
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.getUserByUsername(username)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error comparing passwords" });
        }

        if (result) {
          const { password, ...userData } = user; // Exclure le mot de passe
          res.status(200).json({ message: "Login successful", user: userData });
        } else {
          res.status(400).json({ error: "Incorrect password" });
        }
      });
    })
    .catch((err) => res.status(500).json({ error: "Error fetching user" }));
});

app.get("/checkUsername/:username", (req, res) => {
  const username = req.params.username;

  db.getUserByUsername(username)
    .then((user) => {
      if (user) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    })
    .catch((err) => res.status(500).json({ error: "Error checking username" }));
});



// Endpoint to get all users
app.get("/getUsers", (req, res) => {
  db.getAllUsers()
    .then((result) => {
      if (!result) {
        res.status(404).send("No users found");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => console.log(err));
});

app.get("/getUserByID/:userId", (req, res) => {
  const userId = req.params.userId;
  db.getUserByID(userId)
    .then((result) => {
      if (!result) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => console.log(err));
});

// Endpoint to get all recipes
app.get("/getRecipes", (req, res) => {
  db.getAllRecipes()
    .then((result) => {
      if (!result) {
        res.status(404).send("No recipes found");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => console.log(err));
});

// Endpoint to get recipes by user
app.get("/getRecipesByUser/:userId", (req, res) => {
  const userId = req.params.userId;
  db.getRecipesByUser(userId)
    .then((result) => {
      if (!result) {
        res.status(404).send("No recipes found for this user");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => console.log(err));
});

// Endpoint to get recipe details
app.get("/getRecipeDetails/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  db.getRecipeDetails(recipeId)
    .then((result) => {
      if (!result) {
        res.status(404).send("Recipe not found");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => console.log(err));
});

// Endpoint to search recipes by ingredient
app.get("/searchRecipesByIngredient/:ingredient", (req, res) => {
  const ingredient = req.params.ingredient;
  db.searchRecipesByIngredient(ingredient)
    .then((result) => {
      if (!result) {
        res.status(404).send("No recipes found with this ingredient");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => console.log(err));
});

// Endpoint to add a new favorite
app.post("/addFavorite", (req, res) => {
  const { id, userId, recipeId } = req.body;
  db.addFavorite(id, userId, recipeId)
    .then((result) => {
      res.status(200).send("Favorite added successfully");
    })
    .catch((err) => console.log(err));
});

app.post("/removeFavorite", (req, res) => {
  const { userId, recipeId } = req.body;
  db.removeFavorite(userId, recipeId)
    .then((result) => {
      res.status(200).send("Favorite removed successfully");
    })
    .catch((err) => console.log(err));
});

app.post("/addNewRecipe", (req, res) => {
  const { id, title, picture, text_recipe, user_id, ingredients } = req.body;

  db.addNewRecipe(id, title, picture, text_recipe, user_id, ingredients)
    .then((message) => {
      res.status(200).send({ message });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

// Endpoint to get favorites by user
app.get("/getFavoritesByUser/:userId", (req, res) => {
  const userId = req.params.userId;
  db.getFavoritesByUser(userId)
    .then((result) => {
      if (!result) {
        res.status(404).send("No favorites found for this user");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => console.log(err));
});

// Endpoint to get favorites by user
app.get("/getFavoritesByRecipe/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  db.getFavoritesByRecipe(recipeId)
    .then((result) => {
      if (!result) {
        res.status(404).send("No favorites found for this recipe");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => console.log(err));
});

// Endpoint to delete a recipe by ID
app.delete("/deleteRecipeByID/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  db.deleteRecipeByID(recipeId)
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Recipe not found");
      } else {
        res.status(200).send("Recipe deleted successfully");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting the recipe");
    });
});

// Endpoint to delete a user by ID
app.delete("/deleteUserByID/:userId", (req, res) => {
  const userId = req.params.userId;
  db.deleteUserByID(userId)
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send("User deleted successfully");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting the user");
    });
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Endpoint to get ingredients by recipe ID
app.get("/getIngredientsByRecipeId/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  db.getIngredientsByRecipeId(recipeId)
    .then((result) => {
      if (!result) {
        res.status(404).send("No ingredients found for this recipe");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => res.status(500).send("Error fetching ingredients: " + err));
});


app.put("/updateRecipeById/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  const { title, picture, text_recipe,ingredients } = req.body;

  db.updateRecipeById(recipeId, title, picture, text_recipe,ingredients)
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Recipe not found");
      } else {
        res.status(200).send("Recipe updated successfully");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error updating the recipe: " + err);
    });
});


app.put("/updateUserById/:userId", (req, res) => {
  const userId = req.params.userId;
  const { first_name, last_name, email, phone_number, address, role } =
    req.body;

  db.updateUserById(
    userId,
    first_name,
    last_name,
    email,
    phone_number,
    address,
    role
  )
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send("User updated successfully");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error updating the user: " + err);
    });
});


app.get("/getAllIngredients", (req, res) => {
  db.getAllIngredients()
    .then((result) => {
      if (!result) {
        res.status(404).send("No ingredients found");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => console.log(err));
});
