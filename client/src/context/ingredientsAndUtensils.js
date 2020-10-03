import React, { useState, createContext } from 'react';

export const IngredientsAndUtensilsContext = createContext();

export const IngredientsAndUtensilsProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState([]);
    const [utensils, setUtensils] = useState([]);
    return (
        <IngredientsAndUtensilsContext.Provider
            value={{
                ingredients,
                setIngredients,
                utensils,
                setUtensils
            }}>
            {children}
        </IngredientsAndUtensilsContext.Provider>
    );
}