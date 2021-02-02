import React, { Fragment, useContext } from 'react';
import { YourRecipeContext } from '../../../context/yourRecipe';
import UtensilsCard from './utensilsCard';
/*
Zobrazi karty nacini receptu
*/
function RecipeUtensilsDisplay() {
    const { utensils } = useContext(YourRecipeContext);
    return (
        <Fragment>
            <div className='column'>
                {utensils.map((utensil, index) => (
                    <div key={utensil.utensils_id}>
                        <UtensilsCard utensil={{
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