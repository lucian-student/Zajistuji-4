import React, { Fragment, useContext } from 'react';
import { RecipeFormContext } from '../../context/recipeForm';
import YourUtensilCard from './yourUtensilCard';
function RecipeUtensils() {
    const { recipeUtensils } = useContext(RecipeFormContext);
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Recipe utensils</h3>
            <div className='column'>
                {recipeUtensils.map((utensil, index) => (
                    <div key={utensil.utensils_id}>
                        <YourUtensilCard utensil={{
                            ...utensil,
                            index
                        }} />
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default RecipeUtensils;