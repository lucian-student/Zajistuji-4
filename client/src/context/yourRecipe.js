import React, { createContext, useState } from 'react';
import { YourRecipesContext } from './yourRecipes';

export const YourRecipeContext = createContext();

export const YourRecipeProvider = ({ children }) => {
    const [recipe, setRecipe] = useState(null);
    return (
        <YourRecipesContext.Provider value={{
            recipe,
            setRecipe
        }}>
            {children}
        </YourRecipesContext.Provider>
    )
}



