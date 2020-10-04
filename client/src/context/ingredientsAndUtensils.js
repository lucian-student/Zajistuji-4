import React, { useState, createContext,useCallback } from 'react';
import { ingredientsQuery } from '../queries/ingredientsAndUtensils/defaultIngredients';
export const IngredientsAndUtensilsContext = createContext();

export const IngredientsAndUtensilsProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState([]);
    const [ingredientsPage, setIngredientsPage] = useState(0);
    const [utensils, setUtensils] = useState([]);

    const setIngredientsData = useCallback(async (page)=>{
        ingredientsQuery(page,setIngredients)
    },[])
    return (
        <IngredientsAndUtensilsContext.Provider
            value={{
                ingredients,
                setIngredientsData,
                ingredientsPage,
                setIngredientsPage,
                utensils,
                setUtensils
            }}>
            {children}
        </IngredientsAndUtensilsContext.Provider>
    );
}