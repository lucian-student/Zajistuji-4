import React, { createContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
export const YourRecipesContext = createContext();

export const YourRecipesProvider = ({ children }) => {
    const [yourRecipes, setYourRecipes] = useState([]);
    const [yourRecipesPage, setYourRecipesPage] = useState(0);

    const source = useRef(axios.CancelToken.source());
    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel('canceled');
        }
    }, []);
    return (
        <YourRecipesContext.Provider
            value={{
                yourRecipes,
                setYourRecipes,
                yourRecipesPage,
                setYourRecipesPage,
                source: source.current
            }}>
            {children}
        </YourRecipesContext.Provider>
    )
}