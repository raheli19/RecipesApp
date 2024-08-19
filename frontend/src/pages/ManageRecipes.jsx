import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import RecipeCard from "./RecipeCard";
import Loading from "./Loading";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useUser } from "../context/UserContext";
import "../css/ManageRecipes.css";
import {
  getRecipesByUser,
  getRecipes,
  deleteRecipeById,
  updateRecipeById,
} from "../services/recipeService";
import {
  getAllIngredients,
  getIngredientsByRecipeId,
} from "../services/ingredientService";

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
    <FormControl fullWidth style={{ marginBottom: 20, marginTop:10 }}>
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


export default function ManageRecipes() {
const { user } = useUser();
const [recipes, setRecipes] = useState([]);
const [open, setOpen] = useState(false);
const [recipeToDelete, setRecipeToDelete] = useState(null);
const [updateOpen, setUpdateOpen] = useState(false);
const [updateRecipe, setUpdateRecipe] = useState({
  title: "",
  picture: "",
  text_recipe: "",
});
const [recipeToUpdate, setRecipeToUpdate] = useState(null);

const [ingredientsList, setIngredientsList] = useState([]);
const [selectedIngredients, setSelectedIngredients] = useState([]);

const handleClickOpen = (id) => {
  setRecipeToDelete(id);
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setRecipeToDelete(null);
};

const handleUpdateClickOpen = async (recipe) => {
  setRecipeToUpdate(recipe.id);
  setUpdateRecipe({
    title: recipe.title,
    picture: recipe.picture,
    text_recipe: recipe.text_recipe,
  });

  try {
    const ingredientIds = await getIngredientsByRecipeId(recipe.id);
    setSelectedIngredients(ingredientIds.map((ingredient) => ingredient.id));
  } catch (error) {
    console.error("Failed to fetch ingredients for the recipe:", error);
  }

  setUpdateOpen(true);
};

const handleUpdateClose = () => {
  setUpdateOpen(false);
  setRecipeToUpdate(null);
};

useEffect(() => {
  if (!user) {
    return;
  }

  const fetchRecipes = async () => {
    try {
      const data =
        user.role === "Admin"
          ? await getRecipes()
          : await getRecipesByUser(user.id);
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  fetchRecipes();
}, [user]);

useEffect(() => {
  const fetchIngredients = async () => {
    try {
      const data = await getAllIngredients();
      setIngredientsList(data);
    } catch (error) {
      console.error("Failed to fetch ingredients:", error);
    }
  };

  fetchIngredients();
}, []);

const handleDelete = async (id) => {
  try {
    await deleteRecipeById(id);
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );
    handleClose();
  } catch (error) {
    console.error("Error deleting the recipe:", error);
  }
};

const handleUpdate = async (id) => {
  try {
    const updatedRecipe = {
      ...updateRecipe,
      ingredients: selectedIngredients,
    };
    await updateRecipeById(id, updatedRecipe);
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
    );
    handleUpdateClose();
  } catch (error) {
    console.error("Error updating the recipe:", error);
  }
};

if (!user) {
  return <Loading />;
}

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        padding: "16px",
        overflowY: "auto",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontFamily: "'Georgia', serif",
          fontWeight: "bold",
          marginTop: 50,
        }}
      >
        Manage {user.role === "Admin" ? "all" : "your"} Recipes
      </h1>
      <div className="recipes">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-container">
            <RecipeCard
              id={recipe.id}
              category={recipe.title}
              imgSrc={recipe.picture}
            />
            <div className="recipe-actions">
              <button
                className="delete-button"
                onClick={() => handleClickOpen(recipe.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
              <button
                className="update-button"
                onClick={() => handleUpdateClickOpen(recipe)}
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color={"red"}>
          {"Are you sure to delete this recipe?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By deleting this recipe, you will lose all the information related
            to it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="error"
            onClick={() => handleDelete(recipeToDelete)}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updateOpen} onClose={handleUpdateClose}>
        <DialogTitle>{"Update Recipe"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={updateRecipe.title}
            onChange={(e) =>
              setUpdateRecipe({ ...updateRecipe, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Picture URL"
            type="text"
            fullWidth
            value={updateRecipe.picture}
            onChange={(e) =>
              setUpdateRecipe({ ...updateRecipe, picture: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Recipe Text"
            type="text"
            fullWidth
            multiline
            rows={5}
            value={updateRecipe.text_recipe}
            onChange={(e) =>
              setUpdateRecipe({ ...updateRecipe, text_recipe: e.target.value })
            }
          />
          <MultipleSelectChip
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
            ingredientsList={ingredientsList}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={() => handleUpdate(recipeToUpdate)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
