import React, { useState, createContext } from 'react';
import { useWindowDimensions } from '../utils/dimensions';
export const RecipeFormContext = createContext();

export const RecipeFormProvider = ({ children }) => {
    const [yourIngredientsPage, setyouIngredientsPage] = useState(0);
    const [yourIngredients, setYourIngredients] = useState([]);
    const [yourUtensilsPage, setYourUtensilsPage] = useState(0);
    const [yourUtensils, setYourUtensils] = useState([]);

    const [recipeIngredientsData, setRecipeIngredientsData] = useState({
        recipeIngredients: [],
        tempIngredients: []
    });
    const [recipeUtensils, setRecipeUtensils] = useState([]);

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
                recipeIngredientsData,
                setRecipeIngredientsData,
                recipeUtensils,
                setRecipeUtensils,
                height,
                width
            }}>
            {children}
        </RecipeFormContext.Provider>
    );
}