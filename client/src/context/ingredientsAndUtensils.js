import React, { useState, createContext, useRef, useEffect } from 'react';
import axios from 'axios';
/*
prechovava data o ingrediencich a nacini
*/
export const IngredientsAndUtensilsContext = createContext();

export const IngredientsAndUtensilsProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState([]);
    const [ingredientsPage, setIngredientsPage] = useState(0);
    const [utensils, setUtensils] = useState([]);
    const [utensilsPage, setUtensilsPage] = useState(0);

    const source = useRef(axios.CancelToken.source());
    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel('canceled');
        }
    }, []);
    return (
        <IngredientsAndUtensilsContext.Provider
            value={{
                ingredients,
                setIngredients,
                ingredientsPage,
                setIngredientsPage,
                utensils,
                setUtensils,
                utensilsPage,
                setUtensilsPage,
                source: source.current
            }}>
            {children}
        </IngredientsAndUtensilsContext.Provider>
    );
}