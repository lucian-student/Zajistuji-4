import React, { useState, createContext } from 'react';
import { useWindowDimensions } from '../utils/dimensions';
export const RecipeFormContext = createContext();

export const RecipeFormProvider = ({ children }) => {
    //ingredients
    const [yourIngredientsPage, setyouIngredientsPage] = useState(0);
    const [yourIngredients, setYourIngredients] = useState([]);

    const [recipeIngredients, setRecipeIngredients] = useState([]);

    //utensils
    const [yourUtensilsPage, setYourUtensilsPage] = useState(0);
    const [yourUtensils, setYourUtensils] = useState([]);

    const [recipeUtensils, setRecipeUtensils] = useState([]);
    //steps
    const [recipeSteps, setRecipeSteps] = useState([]);
    const [startedDragging, setStartedDragging] = useState(false);
    //general
    const { height, width } = useWindowDimensions();

    return (
        <RecipeFormContext.Provider
            value={{
                yourIngredientsPage,
                setyouIngredientsPage,
                yourIngredients,
                setYourIngredients,
                yourUtensilsPage,
                setYourUtensilsPage,
                yourUtensils,
                setYourUtensils,
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