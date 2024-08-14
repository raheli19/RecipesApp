import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ShoppingList.css"; // Ensure you have a CSS file for styling
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ShoppingList = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [recipeImage, setRecipeImage] = useState("");

  useEffect(() => {
    // Fetch all recipes
    axios
      .get("http://localhost:3001/getRecipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  useEffect(() => {
    const savedCheckedIngredients =
      JSON.parse(localStorage.getItem("checkedIngredients")) || {};
    setCheckedIngredients(savedCheckedIngredients);
  }, []);

  useEffect(() => {
    if (selectedRecipe) {
      // Fetch ingredients for the selected recipe
      axios
        .get(`http://localhost:3001/getIngredientsByRecipeId/${selectedRecipe}`)
        .then((response) => {
          setIngredients(response.data);
        })
        .catch((error) => {
          console.error("Error fetching ingredients:", error);
        });

      // Fetch the image for the selected recipe
      axios
        .get(`http://localhost:3001/getRecipeDetails/${selectedRecipe}`)
        .then((response) => {
          
          setRecipeImage(response.data[0].picture);
        })
        .catch((error) => {
          console.error("Error fetching recipe image:", error);
        });
    }
  }, [selectedRecipe]);

  const handleCheckboxChange = (recipeId, ingredientId) => {
    setCheckedIngredients((prevState) => {
      const newState = {
        ...prevState,
        [recipeId]: {
          ...prevState[recipeId],
          [ingredientId]: !prevState[recipeId]?.[ingredientId],
        },
      };
      localStorage.setItem("checkedIngredients", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        padding: "16px",
        overflowY: "auto",
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
      className="shopping-list"
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#f9f9f9",
          height: "90%",
          borderRadius: "10px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <h1 style={{ fontFamily: "'Georgia', serif", fontWeight: "bold" }}>
          Select a Recipe
        </h1>
        <div style={{ width: "60%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">
              Recipe
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              className="register-input"
              style={{
                textAlign: "center",
                color: "black",
                margin: 0,
                marginBottom: "10px",
              }}
              value={selectedRecipe}
              size="small"
              placeholder="Role"
              label="Role"
              InputLabelProps={{
                style: { color: "black" },
              }}
              onChange={(e) => setSelectedRecipe(e.target.value)}
            >
              <MenuItem value="">--Select a Recipe--</MenuItem>
              {recipes.map((recipe) => (
                <MenuItem key={recipe.id} value={recipe.id}>
                  {recipe.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {selectedRecipe && (
          <div className="recipe-image">
            <img src={recipeImage} alt="Recipe" />
          </div>
        )}

        {ingredients.length > 0 && (
          <div className="ingredients-list">
            <h2 style={{ fontFamily: "'Georgia', serif", fontWeight: "bold" }}>
              Ingredients
            </h2>
            <ul className="ingredients-grid">
              {ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <input
                    type="checkbox"
                    checked={
                      checkedIngredients[selectedRecipe]?.[ingredient.id] ||
                      false
                    }
                    onChange={() =>
                      handleCheckboxChange(selectedRecipe, ingredient.id)
                    }
                  />
                  <span
                    className={
                      checkedIngredients[selectedRecipe]?.[ingredient.id]
                        ? "checked"
                        : ""
                    }
                  >
                    {ingredient.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
