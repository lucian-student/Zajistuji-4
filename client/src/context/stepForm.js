import React, { createContext, useState } from 'react';
export const StepFormContext = createContext();

export const StepFormProvider = ({ children }) => {
    //TODO disable buttons during drag, make style wrap component in it pointer events none
    const [formIngredients, setFormIngredients] = useState([]);
    const [formUtensils, setFormUtensils] = useState([]);
    return (
        <StepFormContext.Provider
            value={{
                formIngredients,
                setFormIngredients,
                formUtensils,
                setFormUtensils,
            }}>
            {children}
        </StepFormContext.Provider>
    );
}

