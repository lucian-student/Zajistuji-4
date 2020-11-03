import React, { Fragment, useEffect, useContext } from 'react';
import { getYourRecipe } from '../../queries/recipes/getYourRecipe';
import { YourRecipeContext } from '../../context/yourRecipe';
import RecipeDataDisplay from './recipeDataDisplay';
function PageWrapper({ recipie_id }) {
    const { setRecipe } = useContext(YourRecipeContext);
    useEffect(() => {
        getYourRecipe(recipie_id, setRecipe);
    }, [recipie_id, setRecipe])
    return (
        <Fragment>
            <RecipeDataDisplay/>
        </Fragment>
    )
}

export default PageWrapper;