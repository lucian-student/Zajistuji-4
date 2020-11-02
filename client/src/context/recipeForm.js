import React, { useState, createContext } from 'react';
import { useWindowDimensions } from '../utils/dimensions';
export const RecipeFormContext = createContext();

export const RecipeFormProvider = ({ children }) => {
    //ingredients
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    //utensils
    const [recipeUtensils, setRecipeUtensils] = useState([]);
    //steps
    const [recipeSteps, setRecipeSteps] = useState([]);
    const [startedDragging, setStartedDragging] = useState(false);
    //general
    const { height, width } = useWindowDimensions();

    return (
        <RecipeFormContext.Provider
            value={{
                recipeIngredients,
                setRecipeIngredients,
                recipeUtensils,
                setRecipeUtensils,
                height,
                width,
                recipeSteps,
                setRecipeSteps,
                startedDragging,
                setStartedDragging,
            }}>
            {children}
        </RecipeFormContext.Provider>
    );
}