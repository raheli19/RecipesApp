import React, { useState, useEffect } from 'react';
import MealPlanDay from './MealPlanDay';
import axios from 'axios';

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    axios.get('/api/meal-plans/1').then((response) => {
      setMealPlan(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Weekly Meal Planner</h2>
      {mealPlan &&
        mealPlan.days.map((day) => (
          <MealPlanDay key={day.id} day={day} />
        ))}
    </div>
  );
};

export default MealPlanner;
