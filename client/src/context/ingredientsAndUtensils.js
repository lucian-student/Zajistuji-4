import React, { useState, createContext, useCallback } from 'react';
import { ingredientsQuery } from '../queries/ingredients/defaultIngredients';
export const IngredientsAndUtensilsContext = createContext();

export const IngredientsAndUtensilsProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState([]);
    const [ingredientsPage, setIngredientsPage] = useState(0);
    const [utensils, setUtensils] = useState([]);
    const [utensilsPage, setUtensilsPage] = useState(0);

    const setIngredientsData = useCallback(async (page) => {
        ingredientsQuery(page, setIngredients)
    }, [])
    return (
        <IngredientsAndUtensilsContext.Provider
            value={{
                ingredients,
                setIngredients,
                setIngredientsData,
                ingredientsPage,
                setIngredientsPage,
                utensils,
                setUtensils,
                utensilsPage,
                setUtensilsPage
            }}>
            {children}
        </IngredientsAndUtensilsContext.Provider>
    );
}