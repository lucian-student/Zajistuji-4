import React, { useState, createContext } from 'react';

export const RecipeFormContext = createContext();

export const RecipeFormProvider = ({ children }) => {
    const [yourIngredientsPage, setyouIngredientsPage] = useState(0);
    const [yourIngredients, setYourIngredients] = useState([]);
    const [yourUtensilsPage, setYourUtensilsPage] = useState(0);
    const [yourUtensils, setYourUtensils] = useState([]);

    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeUtensils, setRecipeUtensils] = useState([]);
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
                setRecipeUtensils
            }}>
            {children}
        </RecipeFormContext.Provider>
    );
}