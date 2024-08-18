import React, { useState, useEffect } from "react";
import "../css/Home.css";
import RecipeCard from "./RecipeCard";
import Chatbox from "./ChatBot";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useUser } from "../context/UserContext";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Home = () => {
  const { user } = useUser();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const role = user.role;

  const handleSearch = (e) => {
    const { value } = e.target;
    setFilteredRecipes(
      recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetch("http://localhost:3006/getRecipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

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
          display: "flex",
          justifyContent: "center",
        }}
      >
        All Recipes ({filteredRecipes.length})
      </h1>

      <Search className="searchTool" style={{ position: 'fixed', top:38, right:130}}>
        <SearchIconWrapper>
          <i className="fas fa-search"></i>
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          onChange={handleSearch}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>

      <div className="recipes">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            category={recipe.title}
            imgSrc={recipe.picture}
          />
        ))}
      </div>
      <Chatbox />
    </div>
  );
};

export default Home;
