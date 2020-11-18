import React, { Fragment, useEffect, useContext } from 'react';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { recipeUtensilsQuery } from '../../../queries/recipeUtensils/recipeUtensilsDefault';
function RecipeUtensilsWrapper({ children, show }) {
    const { setUtensils, recipe: { recipie_id }, source } = useContext(YourRecipeContext);
    useEffect(() => {
        const reciveData = async () => {
            await recipeUtensilsQuery(recipie_id, setUtensils, source);
        }
        reciveData();
    }, [setUtensils, recipie_id, source])
    return (
        <Fragment>
            {show && (
                <Fragment>
                    {children}
                </Fragment>
            )}
        </Fragment>
    )
}

export default RecipeUtensilsWrapper;