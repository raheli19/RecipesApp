import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/RecipeDetail.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  getRecipeDetails
} from "../services/recipeService";
import { addFavorite, removeFavorite, getFavoritesByRecipe } from "../services/favoriteService";
import heartGray from "../assets/heart-gray.png";
import heartPink from "../assets/heart-pink.png";

const RecipeDetail = () => {
  const { user } = useUser();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const idTable = Math.floor(Math.random() * 1000000);
    try {
      if (isFavorite) {
        await removeFavorite({
          userId: user.id,
          recipeId: id,
        });
        console.log("Favorite removed successfully");
        setIsFavorite(false);
      } else {
        await addFavorite({
          id: idTable,
          userId: user.id,
          recipeId: id,
        });
        console.log("Favorite added successfully");
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await getRecipeDetails(id);
        setRecipe(data[0]);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    const checkFavoriteStatus = async () => {
      try {
        const data = await getFavoritesByRecipe(id);
        if (
          data.length > 0 &&
          data.some((favorite) => favorite.user_id === user.id)
        ) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    fetchRecipeDetails();
    checkFavoriteStatus();
  }, [id, user.id]);

  if (!recipe) return <div>Loading...</div>;

  const formatTextAsParagraphs = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, index) => (
      <p key={index} style={{ margin: 0, padding: "0.5em 0" }}>
        {line}
      </p>
    ));
  };

  return (
    <div style={{ width: "100%", height: "100vh", overflowY: "auto" }}>
      <div className="recipe-detail" style={{ flex: 1 }}>
        <h1 style={{ fontFamily: "'Georgia', serif", fontWeight: "bold" }}>
          {recipe.title}
        </h1>
        <div>
          <div style={{ position: "relative", width: "100%" }}>
            <img src={recipe.picture} alt={recipe.title} />
            <img
              src={isFavorite ? heartPink : heartGray}
              alt="favorite"
              onClick={handleClick}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
            />
          </div>
          <pre
            style={{
              width: "100%",
              fontFamily: "'Georgia', serif",
              fontWeight: "bold",
              fontSize: "0.9em",
              lineHeight: "1.6",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              paddingTop: "1em",
              paddingBottom: "1em",
              margin: "0",
              wordBreak: "break-word",
              overflowX: "auto",
              marginBottom: "50px",
            }}
          >
            {formatTextAsParagraphs(recipe.text_recipe)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
