import React, { createContext, useState } from 'react';

export const YourRecipesContext = createContext();

export const YourRecipesProvider = ({ children }) => {
    const [yourRecipes, setYourRecipes] = useState([]);
    const [yourRecipesPage, setYourRecipesPage] = useState(0);
    return (
        <YourRecipesContext.Provider
            value={{
                yourRecipes,
                setYourRecipes,
                yourRecipesPage,
                setYourRecipesPage
            }}>
            {children}
        </YourRecipesContext.Provider>
    )
}