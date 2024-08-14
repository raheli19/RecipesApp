import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import Loading from "./Loading";
import { useUser } from "../context/UserContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/ManageRecipes.css";

export default function Favorite() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    fetch(`http://localhost:3001/getFavoritesByUser/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data);
      })
      .catch((error) => console.error("Error fetching favorites:", error));
  }, [user]);

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
        Your Favorite Recipes
      </h1>
      <div className="recipes">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="recipe-container">
            <RecipeCard
              id={favorite.recipe_id}
              category={favorite.title}
              imgSrc={favorite.picture}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
