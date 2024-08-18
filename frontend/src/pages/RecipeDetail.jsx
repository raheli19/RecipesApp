import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/RecipeDetail.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

import heartGray from "../assets/heart-gray.png"; // Import heart gray image
import heartPink from "../assets/heart-pink.png"; // Import heart pink image

const RecipeDetail = () => {
  const { user } = useUser();
  const { id } = useParams();
  const [recipe, setRecipes] = useState([]);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false); // State to manage favorite status

  const handleClick = (e) => {
    e.preventDefault();

    const idTable = Math.floor(Math.random() * 1000000);
if(isFavorite){
  fetch("http://localhost:3006/removeFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        recipeId: id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Favorite removed successfully");

        setIsFavorite(false); // Update the favorite status
      })
      .catch((error) => {
        console.error("Error removing new favorite:", error);
      });
}
else{
    fetch("http://localhost:3006/addFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idTable,
        userId: user.id,
        recipeId: id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Favorite added successfully");

        setIsFavorite(true); // Update the favorite status
      })
      .catch((error) => {
        console.error("Error adding new favorite:", error);
      });
    };
  };

  useEffect(() => {
    // Fetch recipe details
    fetch(`http://localhost:3006/getRecipeDetails/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipes(data[0]))
      .catch((error) => console.error("Error fetching recipes:", error));

    // Check if the recipe is already a favorite
    fetch(`http://localhost:3006/getFavoritesByRecipe/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (
          data.length > 0 &&
          data.some((favorite) => favorite.user_id === user.id)
        ) {
          setIsFavorite(true); // If the recipe is already a favorite and the user has favorited it, set the heart to pink
        }
      })
      .catch((error) =>
        console.error("Error checking favorite status:", error)
      );
  }, [id, user.id]);

  if (!recipe) return <div>Loading...</div>;

  // Fonction pour remplacer les sauts de ligne par des balises <p>
  const formatTextAsParagraphs = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, index) => (
      <p key={index} style={{ margin: 0, padding: "0.5em 0" }}>
        {line}
      </p>
    ));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div className="recipe-detail" style={{ flex: 1 }}>
        <h1 style={{ fontFamily: "'Georgia', serif", fontWeight: "bold" }}>
          {recipe.title}
        </h1>
        <div>
          <div style={{ position: 'relative', width:'100%'}}>
            <img src={recipe.picture} alt={recipe.title} />
            <img
              src={isFavorite ? heartPink : heartGray} // Change image based on favorite status
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
