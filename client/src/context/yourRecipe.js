import React, { createContext, useState } from 'react';

export const YourRecipeContext = createContext();

export const YourRecipeProvider = ({ children }) => {
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [utensils, setUtensils] = useState([]);
    const [steps, setSteps] = useState([]);
    const [startedDragging, setStartedDragging] = useState(false);
    return (
        <YourRecipeContext.Provider value={{
            recipe,
            setRecipe,
            ingredients,
            setIngredients,
            utensils,
            setUtensils,
            steps,
            setSteps,
            startedDragging,
            setStartedDragging
        }}>
            {children}
        </YourRecipeContext.Provider>
    )
}



