import React, { Fragment, useEffect, useContext } from 'react';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { recipeIngredientsQuery } from '../../../queries/recipeIngredients/recipeIngredientsDefault';
function RecipeIngredientsWrapper({ children, show }) {
    const { setIngredients, recipe: { recipie_id } } = useContext(YourRecipeContext);
    useEffect(() => {
        const reciveData = async () => {
            await recipeIngredientsQuery(recipie_id, setIngredients)
        };
        reciveData();
    }, [recipie_id, setIngredients])
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

export default RecipeIngredientsWrapper;