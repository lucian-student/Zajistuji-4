import React, { createContext } from 'react';
import { useWindowDimensions } from '../utils/dimensions';
/*
Prechovava data o velikosti obrazovky
*/
export const DimensionsContext = createContext();

export const DimensionsProvider = ({ children }) => {
    const { height, width } = useWindowDimensions();
    return (
        <DimensionsContext.Provider
            value={{
                height,
                width
            }}>
            {children}
        </DimensionsContext.Provider>
    );
}