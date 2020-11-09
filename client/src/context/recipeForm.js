import React, { useState, createContext } from 'react';
export const RecipeFormContext = createContext();

export const RecipeFormProvider = ({ children }) => {
    //ingredients
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    //utensils
    const [recipeUtensils, setRecipeUtensils] = useState([]);
    //steps
    const [recipeSteps, setRecipeSteps] = useState([]);
    const [startedDragging, setStartedDragging] = useState(false);

    return (
        <RecipeFormContext.Provider
            value={{
                recipeIngredients,
                setRecipeIngredients,
                recipeUtensils,
                setRecipeUtensils,
                recipeSteps,
                setRecipeSteps,
                startedDragging,
                setStartedDragging,
            }}>
            {children}
        </RecipeFormContext.Provider>
    );
}