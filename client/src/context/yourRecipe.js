import React, { createContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
export const YourRecipeContext = createContext();

export const YourRecipeProvider = ({ children }) => {
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [utensils, setUtensils] = useState([]);
    const [steps, setSteps] = useState([]);
    const [startedDragging, setStartedDragging] = useState(false);

    const source = useRef(axios.CancelToken.source());
    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel('canceled');
        }
    }, []);
    return (
        <YourRecipeContext.Provider value={{
            recipe,
            setRecipe,
            ingredients,
            setIngredients,
            utensils,
            setUtensils,
            steps,
            setSteps,
            startedDragging,
            setStartedDragging,
            source: source.current
        }}>
            {children}
        </YourRecipeContext.Provider>
    )
}



