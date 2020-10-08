import React, { useState, createContext } from 'react';

export const RecipeFormContext = createContext();

export const RecipeFormProvider = ({ children }) => {
    return (
        <RecipeFormContext.Provider
            value={{
            }}>
            {children}
        </RecipeFormContext.Provider>
    );
}