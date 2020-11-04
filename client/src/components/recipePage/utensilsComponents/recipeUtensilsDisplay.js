import React, { Fragment, useEffect, useContext } from 'react';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { recipeUtensilsQuery } from '../../../queries/recipeUtensils/recipeUtensilsDefault';
import UtensilsCard from './utensilsCard';
function RecipeUtensilsDisplay() {
    const { utensils, setUtensils, recipe: { recipie_id } } = useContext(YourRecipeContext);
    useEffect(() => {
        const reciveData = async () => {
            await recipeUtensilsQuery(recipie_id, setUtensils);
        }
        reciveData();
    }, [setUtensils, recipie_id])
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