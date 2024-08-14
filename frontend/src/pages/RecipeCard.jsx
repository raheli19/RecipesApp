/*import React from "react";

const RecipeCard = ({ category,  imgSrc }) => {
  return (
    <div className="recipe-card">
      <img src={imgSrc} alt={category} />
      <div className="recipe-info">
        <h2>{category}</h2>
        
      </div>
    </div>
  );
};

export default RecipeCard;
*/

import React from "react";
import { NavLink } from "react-router-dom";
import "../css/RecipeCard.css";

const RecipeCard = ({ id, category, imgSrc }) => {
  return (
    <div
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      style={{
        height: "200px",
        width: "180px",
        margin: 20,
        borderRadius: 10,
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out",
        boxShadow:
          "0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 5px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <NavLink
        to={`/recipe/${id}`}
        style={{ textDecoration: "none", height: "100%", width: "100%" }}
      >
        <img
          src={imgSrc}
          alt={category}
          style={{ height: "80%", width: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            height: "20%",
            width: "100%",
            color: "#e26464",
            backgroundColor: "#ffe4c4",
            fontWeight: "bold",
          }}
        >
          {category}
        </div>
      </NavLink>
    </div>
  );
};

export default RecipeCard;
