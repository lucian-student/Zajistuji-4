import React, { useState, createContext, useCallback } from 'react';
import { useWindowDimensions } from '../utils/dimensions';
import update from 'immutability-helper';
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

    const noDrop = useCallback(() => {
        setRecipeIngredientsData(update(recipeIngredientsData, {
            tempIngredients: { $set: recipeIngredientsData.recipeIngredients }
        }))
    }, [recipeIngredientsData, setRecipeIngredientsData]);

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
                width,
                noDrop
            }}>
            {children}
        </RecipeFormContext.Provider>
    );
}