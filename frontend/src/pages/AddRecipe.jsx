import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import "../css/AddRecipe.css";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelectChip({
  selectedIngredients,
  setSelectedIngredients,
  ingredientsList,
}) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedIngredients(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FormControl fullWidth style={{ marginBottom: 20 }}>
      <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={selectedIngredients}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={
                  ingredientsList.find((ingredient) => ingredient.id === value)
                    .title
                }
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {ingredientsList.map((ingredient) => (
          <MenuItem
            key={ingredient.id}
            value={ingredient.id}
            style={getStyles(ingredient.title, selectedIngredients, theme)}
          >
            {ingredient.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function AddRecipe() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: "",
    picture: "",
    text_recipe: "",
    user_id: user.id,
    ingredients: [],
  });
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const navigate = useNavigate();

  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3006/getAllIngredients"
        );
        setIngredientsList(response.data);
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = Math.floor(Math.random() * 1000000);

    fetch("http://localhost:3006/addRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        id,
        ingredients: selectedIngredients,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Recipe added successfully");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error adding new recipe:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="addRecipe"
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
          Add Recipe
        </h1>
        <form
          onSubmit={handleSubmit}
          className="addRecipe"
          style={{
            height: "calc(100% - 150px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <TextField
              style={{ marginBottom: 20 }}
              label="Name of Recipe"
              variant="outlined"
              fullWidth
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              style={{ marginBottom: 20 }}
              label="Link to image"
              variant="outlined"
              fullWidth
              name="picture"
              value={formData.picture}
              onChange={handleChange}
              required
            />
            <TextField
              style={{ marginBottom: 20 }}
              label="Text of Recipe"
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              name="text_recipe"
              value={formData.text_recipe}
              onChange={handleChange}
              required
            />

            <MultipleSelectChip
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
              ingredientsList={ingredientsList}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              fontFamily: "'Georgia', serif",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "brown",
            }}
          >
            Save Recipe
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
