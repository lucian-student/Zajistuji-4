import React, { useState, createContext, useEffect, useRef } from 'react';
import axios from 'axios';
/*
prechovava data o receptu ve formulari
*/
export const RecipeFormContext = createContext();

export const RecipeFormProvider = ({ children }) => {
    //ingredients
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    //utensils
    const [recipeUtensils, setRecipeUtensils] = useState([]);
    //steps
    const [recipeSteps, setRecipeSteps] = useState([]);
    const [startedDragging, setStartedDragging] = useState(false);
    //cancel token
    const source = useRef(axios.CancelToken.source());
    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel('canceled');
        }
    }, []);
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
                source: source.current
            }}>
            {children}
        </RecipeFormContext.Provider>
    );
}