import React, { Fragment, useEffect, useContext } from 'react';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { recipeIngredientsQuery } from '../../../queries/recipeIngredients/recipeIngredientsDefault';
/*
Kontrola jestli se nacetli ingredience receptu
*/
function RecipeIngredientsWrapper({ children, show }) {
    const { setIngredients, recipe: { recipie_id }, source } = useContext(YourRecipeContext);
    useEffect(() => {
        const reciveData = async () => {
            await recipeIngredientsQuery(recipie_id, setIngredients, source)
        };
        reciveData();
    }, [recipie_id, setIngredients, source])
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