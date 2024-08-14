var mysql = require("mysql2");
const connectionInfo = require("./connectionInfo").connectionInfo;

var con = mysql.createConnection(connectionInfo);

exports.insertUser = function (user, password) {
  const { last_name, first_name, email, phone_number, address, role } = user;
  const id = Math.floor(Math.random() * 1000000);

  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO users (first_name, password, id, last_name, email, phone_number, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    con.query(
      query,
      [
        first_name,
        password,
        id,
        last_name,
        email,
        phone_number,
        address,
        role,
      ],
      (error, results) => {
        if (error) {
          console.log(error.stack);
          reject("Error inserting user: " + error.stack);
          return;
        }
        const newUser = {
          id,
          first_name,
          last_name,
          email,
          phone_number,
          address,
          role,
        };
        resolve({ results, newUser });
      }
    );
  });
};

exports.getUserByUsername = function (first_name) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE first_name = ?";
    con.query(query, [first_name], (error, results) => {
      if (error) {
        reject("Error fetching user: " + error.stack);
        return;
      }
      resolve(results[0]);
    });
  });
};

exports.getAllUsers = function () {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users`;
    con.query(query, (error, results) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
};




exports.getUserByID = function (userId) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users WHERE id = ?`;
    con.query(query, [userId], (error, results) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }
      resolve(results[0]); // Return the first result (should be only one since id is primary key)
    });
  });
};

exports.getAllRecipes = function () {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM recipes`;
    con.query(query, (error, results) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
};

exports.getAllIngredients = function () {
  return new Promise((resolve, reject) => {
    let query = `SELECT id,title FROM ingredients`;
    con.query(query, (error, results) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
};

exports.getRecipesByUser = function (userId) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM recipes WHERE user_id = ?`;
    con.query(query, [userId], (error, results) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
};

exports.getRecipeDetails = function (recipeId) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM recipes WHERE id = ?`;
    con.query(query, [recipeId], (error, results) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
};

exports.searchRecipesByIngredient = function (ingredient) {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT recipes.* 
      FROM recipes 
      JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id
      JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id
      WHERE ingredients.title = ?`;
    con.query(query, [ingredient], (error, results) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
};

exports.addFavorite = function (id,userId, recipeId) {
  return new Promise((resolve, reject) => {
    let query = "INSERT INTO favorite (id, user_id, recipe_id) VALUES (?, ?, ?)";
    con.query(query, [id,userId, recipeId], (error, results) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
};

exports.removeFavorite = function (userId, recipeId) {
  return new Promise((resolve, reject) => {
    let query = "DELETE FROM favorite WHERE user_id = ? AND recipe_id = ?";
    con.query(query, [userId, recipeId], (error, results) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
}

/*exports.addNewRecipe = function (id, title, picture, text_recipe, user_id) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO recipes (id, title, picture, text_recipe, user_id) VALUES (?, ?, ?, ?, ?)";
    con.query(
      query,
      [id, title, picture, text_recipe, user_id],
      (error, results) => {
        if (error) {
          reject("Error inserting recipe: " + error.stack);
          return;
        }
        resolve(results);
      }
    );
  });
}; */





exports.getFavoritesByUser = function (userId) {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT favorite.id, favorite.user_id, favorite.recipe_id, recipes.title, recipes.picture, recipes.text_recipe
      FROM favorite 
      JOIN recipes ON favorite.recipe_id = recipes.id 
      WHERE favorite.user_id = ?
    `;
    con.query(query, [userId], (error, results) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
};

exports.getFavoritesByRecipe = function (recipeId) {
  return new Promise((resolve, reject) => {
    let query = `
     SELECT favorite.id, favorite.user_id, favorite.recipe_id, recipes.title 
      FROM favorite 
      JOIN recipes ON favorite.recipe_id = recipes.id 
      WHERE favorite.recipe_id = ?
    `;
    con.query(query, [recipeId], (error, results) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
};

exports.deleteRecipeByID = function (recipeId) {
  return new Promise((resolve, reject) => {
    // Delete all comments linked to this recipe and delete the recipe
        con.beginTransaction((err) => {
      if (err) {
        reject("Error starting the transaction: " + err.stack);
        return;
      }
    
      let query = `DELETE FROM comments WHERE recipe_id = ?`;
      con.query(query, [recipeId], (error, results) => {
        if (error) {
          return con.rollback(() => {
            reject("Error executing the query: " + error.stack);
          });
        }
    
        query = `DELETE FROM recipe_ingredients WHERE recipe_id = ?`;
        con.query(query, [recipeId], (error, results) => {
          if (error) {
            return con.rollback(() => {
              reject("Error executing the query: " + error.stack);
            });
          }

          // add favorite
          query = `DELETE FROM favorite WHERE recipe_id = ?`;
          con.query(query, [recipeId], (error, results) => {
            if (error) {
              return con.rollback(() => {
                reject("Error executing the query: " + error.stack);
              });
            }});
    
          query = `DELETE FROM recipes WHERE id = ?`;
          con.query(query, [recipeId], (error, results) => {
            if (error) {
              return con.rollback(() => {
                reject("Error executing the query: " + error.stack);
              });
            }
    
            con.commit((err) => {
              if (err) {
                return con.rollback(() => {
                  reject("Error committing the transaction: " + err.stack);
                });
              }
              resolve(results);
            });
          });
        });
      });
    });
  });
};

exports.deleteUserByID = function (userId) {
  return new Promise((resolve, reject) => {
    // Delete all comments linked to this recipe and delete the recipe
    con.beginTransaction((err) => {
      if (err) {
        reject("Error starting the transaction: " + err.stack);
        return;
      }
    
      let query = `DELETE FROM comments WHERE user_id = ?`;
      con.query(query, [userId], (error, results) => {
        if (error) {
          return con.rollback(() => {
            reject("Error executing the query: " + error.stack);
          });
        }
    
        query = `DELETE FROM favorite WHERE user_id = ?`;
        con.query(query, [userId], (error, results) => {
          if (error) {
            return con.rollback(() => {
              reject("Error executing the query: " + error.stack);
            });
          }
    
          query = `DELETE FROM recipes WHERE user_id = ?`;
          con.query(query, [userId], (error, results) => {
            if (error) {
              return con.rollback(() => {
                reject("Error executing the query: " + error.stack);
              });
            }
    
            query = `DELETE FROM users WHERE id = ?`;
            con.query(query, [userId], (error, results) => {
              if (error) {
                return con.rollback(() => {
                  reject("Error executing the query: " + error.stack);
                });
              }
    
              con.commit((err) => {
                if (err) {
                  return con.rollback(() => {
                    reject("Error committing the transaction: " + err.stack);
                  });
                }
                resolve(results);
              });
            });
          });
        });
      });
    });
  });
}




const { v4: uuidv4 } = require("uuid"); // Ajoute cette ligne en haut de ton fichier pour utiliser la génération d'UUID




exports.getIngredientsByRecipeId = function (recipeId) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT ingredients.id, ingredients.title, ingredients.picture 
      FROM ingredients 
      JOIN recipe_ingredients ON ingredients.id = recipe_ingredients.ingredient_id 
      WHERE recipe_ingredients.recipe_id = ?`;
    con.query(query, [recipeId], (error, results) => {
      if (error) {
        reject("Error executing the query: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
};

exports.addNewRecipe = function (
  id,
  title,
  picture,
  text_recipe,
  user_id,
  ingredients
) {
  return new Promise((resolve, reject) => {
    const recipeQuery =
      "INSERT INTO recipes (id, title, picture, text_recipe, user_id) VALUES (?, ?, ?, ?, ?)";

    con.query(
      recipeQuery,
      [id, title, picture, text_recipe, user_id],
      (error, results) => {
        if (error) {
          reject("Error inserting recipe: " + error.stack);
          return;
        }

        // Préparer les valeurs pour l'insertion multiple dans recipe_ingredients avec un id aléatoire
        const ingredientValues = ingredients.map((ingredient_id) => [
          Math.floor(Math.random() * 1000000),
          id,
          ingredient_id,
        ]);

        const linkQuery =
          "INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id) VALUES ?";

        con.query(linkQuery, [ingredientValues], (error, results) => {
          if (error) {
            reject("Error linking ingredients: " + error.stack);
            return;
          }
          resolve("Recipe and ingredients added successfully");
        });
      }
    );
  });
};
/*exports.updateRecipeById = function (recipeId, title, picture, text_recipe,ingredients) {
  return new Promise((resolve, reject) => {
    let fields = [];
    let values = [];

    if (title) {
      fields.push("title = ?");
      values.push(title);
    }
    if (picture) {
      fields.push("picture = ?");
      values.push(picture);
    }
    if (text_recipe) {
      fields.push("text_recipe = ?");
      values.push(text_recipe);
    }

    if (fields.length === 0) {
      reject("No fields to update");
      return;
    }

    values.push(recipeId);
    const query = `UPDATE recipes SET ${fields.join(", ")} WHERE id = ?`;

    con.query(query, values, (error, results) => {
      if (error) {
        reject("Error updating recipe: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
};*/

exports.updateRecipeById = function (
  recipeId,
  title,
  picture,
  text_recipe,
  ingredients
) {
  return new Promise((resolve, reject) => {
    let fields = [];
    let values = [];

    // Ajout des champs à mettre à jour
    if (title) {
      fields.push("title = ?");
      values.push(title);
    }
    if (picture) {
      fields.push("picture = ?");
      values.push(picture);
    }
    if (text_recipe) {
      fields.push("text_recipe = ?");
      values.push(text_recipe);
    }

    if (fields.length === 0) {
      reject("No fields to update");
      return;
    }

    values.push(recipeId);
    const query = `UPDATE recipes SET ${fields.join(", ")} WHERE id = ?`;

    con.query(query, values, (error, results) => {
      if (error) {
        reject("Error updating recipe: " + error.stack);
        return;
      }

      // Suppression des anciens ingrédients
      const deleteQuery = `DELETE FROM recipe_ingredients WHERE recipe_id = ?`;
      con.query(deleteQuery, [recipeId], (error, results) => {
        if (error) {
          reject("Error deleting old ingredients: " + error.stack);
          return;
        }

        const insertValues = ingredients.map((ingredient_id) => [
          Math.floor(Math.random() * 1000000),
          recipeId,
          ingredient_id,
        ]);
        const insertQuery =
          "INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id) VALUES ?";

        // Exécution de l'insertion en une seule requête avec un batch d'inserts
        con.query(insertQuery, [insertValues], (error, results) => {
          if (error) {
            reject("Error inserting new ingredients: " + error.stack);
            return;
          }
          resolve("Recipe and ingredients updated successfully");
        });
      });
    });
  });
};

exports.updateUserById = function (
  userId,
  first_name,
  last_name,
  email,
  phone_number,
  address,
  role
) {
  return new Promise((resolve, reject) => {
    let fields = [];
    let values = [];
    let picture;

    if (first_name) {
      fields.push("first_name = ?");
      values.push(first_name);
    }
    if (last_name) {
      fields.push("last_name = ?");
      values.push(last_name);
    }
    if (email) {
      fields.push("email = ?");
      values.push(email);
    }
    if (phone_number) {
      fields.push("phone_number = ?");
      values.push(phone_number);
    }
    if (address) {
      fields.push("address = ?");
      values.push(address);
    }
    if (role) {
      fields.push("role = ?");
      values.push(role);
    }

    if (fields.length === 0) {
      reject("No fields to update");
      return;
    }

    values.push(userId);
    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

    con.query(query, values, (error, results) => {
      if (error) {
        reject("Error updating user: " + error.stack);
        return;
      }
      resolve(results);
    });
  });
};
