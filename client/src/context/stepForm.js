import React, { createContext, useCallback, useState } from 'react';
import update from 'immutability-helper';
export const StepFormContext = createContext();

export const StepFormProvider = ({ children }) => {
    const [formIngredientsData, setFormIngredientsData] = useState({
        formIngredients: [],
        tempIngredients: []
    });

    const noDrop = useCallback(() => {
        setFormIngredientsData(update(formIngredientsData, {
            tempIngredients: { $set: formIngredientsData.formIngredients }
        }))
    }, [formIngredientsData, setFormIngredientsData]);


    const [formUtensilsData, setFormUtensilsData] = useState({
        formUtensils: [],
        tempUtensils: []
    });

    const noDrop2 = useCallback(() => {
        setFormUtensilsData(update(formUtensilsData, {
            tempUtensils: { $set: formUtensilsData.formUtensils }
        }))
    }, [formUtensilsData, setFormUtensilsData]);


    return (
        <StepFormContext.Provider
            value={{
                formIngredientsData,
                setFormIngredientsData,
                noDrop,
                formUtensilsData,
                setFormUtensilsData,
                noDrop2
            }}>
            {children}
        </StepFormContext.Provider>
    );
}

