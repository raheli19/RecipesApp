import React from 'react';
import AddMealForm from './AddMealForm';

const MealPlanDay = ({ day }) => {
  return (
    <div>
      <h3>{day.dayOfWeek}</h3>
      {day.meals.map((meal) => (
        <div key={meal.id}>{meal.mealType}: {meal.recipe.name}</div>
      ))}
      <AddMealForm dayId={day.id} />
    </div>
  );
};

export default MealPlanDay;
