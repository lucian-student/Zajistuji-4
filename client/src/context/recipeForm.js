import React, { useState, createContext, useCallback } from 'react';
import { useWindowDimensions } from '../utils/dimensions';
import update from 'immutability-helper';
export const RecipeFormContext = createContext();

export const RecipeFormProvider = ({ children }) => {
    //ingredients
    const [yourIngredientsPage, setyouIngredientsPage] = useState(0);
    const [yourIngredients, setYourIngredients] = useState([]);

    const [recipeIngredientsData, setRecipeIngredientsData] = useState({
        recipeIngredients: [],
        tempIngredients: []
    });

    const noDrop = useCallback(() => {
        setRecipeIngredientsData(update(recipeIngredientsData, {
            tempIngredients: { $set: recipeIngredientsData.recipeIngredients }
        }))
    }, [recipeIngredientsData, setRecipeIngredientsData]);

    //utensils
    const [yourUtensilsPage, setYourUtensilsPage] = useState(0);
    const [yourUtensils, setYourUtensils] = useState([]);

    const [recipeUtensilsData, setRecipeUtensilsData] = useState({
        recipeUtensils: [],
        tempUtensils: []
    });

    const noDrop2 = useCallback(() => {
        setRecipeUtensilsData(update(recipeUtensilsData, {
            tempUtensils: { $set: recipeUtensilsData.recipeUtensils }
        }))
    }, [recipeUtensilsData, setRecipeUtensilsData])
    //steps
    const [recipeStepsData, setRecipeStepsData] = useState({
        recipeSteps: [],
        tempSteps: []
    })
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
                recipeIngredientsData,
                setRecipeIngredientsData,
                recipeUtensilsData,
                setRecipeUtensilsData,
                height,
                width,
                noDrop,
                noDrop2,
                recipeStepsData,
                setRecipeStepsData
            }}>
            {children}
        </RecipeFormContext.Provider>
    );
}