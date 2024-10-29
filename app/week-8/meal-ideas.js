"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image"; // Import Image component

// Fetch meal ideas based on ingredient
async function fetchMealIdeas(ingredient) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();
  return data.meals || [];
}

// Fetch detailed meal information based on meal ID
async function fetchMealDetails(idMeal) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Load meal ideas for the given ingredient
  const loadMealIdeas = useCallback(() => {
    if (ingredient) {
      fetchMealIdeas(ingredient).then((meals) => setMeals(meals));
    } else {
      setMeals([]);
    }
  }, [ingredient]); // Include ingredient as a dependency

  useEffect(() => {
    loadMealIdeas();
  }, [loadMealIdeas]); // Keep this dependency

  // Load detailed meal information when a meal is clicked
  const loadMealDetails = async (idMeal) => {
    const mealDetails = await fetchMealDetails(idMeal);
    setSelectedMeal(mealDetails);
  };

  useEffect(() => {
    if (ingredient) loadMealIdeas();
  }, [ingredient, loadMealIdeas]); // Include loadMealIdeas as a dependency

  return (
    <div className="ml-0 mr-10 text-white">
      <h2 className="text-2xl font-bold mb-3">
        Meal Ideas for &quot;{ingredient}&quot; {/* Escaped quotes */}
      </h2>
      {selectedMeal ? (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{selectedMeal.strMeal}</h3>
          <Image // Use Image component from Next.js
            src={selectedMeal.strMealThumb}
            alt={selectedMeal.strMeal}
            width={192} // Set appropriate width
            height={192} // Set appropriate height
            className="w-48 h-48 rounded"
          />

          {/* Ingredients List */}
          <h4 className="text-lg font-semibold">Ingredients:</h4>
          <ul className="list-disc list-inside">
            {Array.from({ length: 20 }).map((_, i) => {
              const ingredient = selectedMeal[`strIngredient${i + 1}`];
              const measure = selectedMeal[`strMeasure${i + 1}`];
              return ingredient ? (
                <li key={i}>{`${ingredient} - ${measure}`}</li>
              ) : null;
            })}
          </ul>

          {/* Instructions */}
          <h4 className="text-lg font-semibold">Instructions:</h4>
          <p className="text-sm leading-relaxed">
            {selectedMeal.strInstructions}
          </p>

          <button
            className="mt-4 px-4 py-2 bg-slate-700 rounded text-white"
            onClick={() => setSelectedMeal(null)}
          >
            Back to Meal Ideas
          </button>
        </div>
      ) : (
        <ul className="space-y-2">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="flex items-center space-x-4 p-2 bg-slate-900 max-w-sm cursor-pointer"
              onClick={() => loadMealDetails(meal.idMeal)}
            >
              <Image // Use Image component from Next.js
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={64} // Set appropriate width
                height={64} // Set appropriate height
                className="w-16 h-16 rounded"
              />
              <span className="text-lg">{meal.strMeal}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
