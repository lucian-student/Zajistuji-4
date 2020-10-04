import React, { Fragment, useEffect, useContext } from 'react';
import { IngredientsAndUtensilsContext } from '../../context/ingredientsAndUtensils';
function IngredinetsDisplay() {
    const { ingredientsPage, setIngredientsData,ingredients} = useContext(IngredientsAndUtensilsContext);
    useEffect(() => {
        setIngredientsData(ingredientsPage);
    }, [ingredientsPage,setIngredientsData]);
    return (
        <Fragment>
            {ingredients.map(ingredient => (
                <div key={ingredient.ingredients_id}>
                    {ingredient.name}
                </div>
            ))}
        </Fragment>
    )
}

export default IngredinetsDisplay;