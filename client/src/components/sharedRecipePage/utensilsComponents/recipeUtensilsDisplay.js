import React, { Fragment, useContext } from 'react';
import { YourRecipeContext } from '../../../context/yourRecipe';
import RecipeUtensilCard from './recipeUtensilCard';
function RecipeUtensilsDisplay() {
    const { utensils } = useContext(YourRecipeContext);
    return (
        <Fragment>
            <div className='column'>
                {utensils.map((utensil, index) => (
                    <div key={utensil.utensils_id}>
                        <RecipeUtensilCard utensil={{
                            ...utensil,
                            index
                        }} />
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default RecipeUtensilsDisplay;