import React, { createContext, useState } from 'react';

export const YourRecipeContext = createContext();

export const YourRecipeProvider = ({ children }) => {
    const [recipe, setRecipe] = useState(null);
    return (
        <YourRecipeContext.Provider value={{
            recipe,
            setRecipe
        }}>
            {children}
        </YourRecipeContext.Provider>
    )
}



