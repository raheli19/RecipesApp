import React, { useState } from 'react';
import axios from 'axios';

const AddMealForm = ({ dayId }) => {
  const [mealType, setMealType] = useState('Breakfast');
  const [recipeId, setRecipeId] = useState('');

  const handleAddMeal = () => {
    axios.post(`/api/meal-plans/days/${dayId}/meals`, {
      mealType,
      recipeId
    }).then(() => {
      // Refresh or update the meal plan data
    });
  };

  return (
    <div>
      <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
      <input
        type="text"
        placeholder="Recipe ID"
        value={recipeId}
        onChange={(e) => setRecipeId(e.target.value)}
      />
      <button onClick={handleAddMeal}>Add Meal</button>
    </div>
  );
};

export default AddMealForm;
