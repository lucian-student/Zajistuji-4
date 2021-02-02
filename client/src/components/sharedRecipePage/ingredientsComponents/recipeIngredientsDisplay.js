import React, { Fragment, useContext } from 'react';
import { YourRecipeContext } from '../../../context/yourRecipe';
import RecipeIngredientsCard from './recipeIngredientsCard';
/*
Zobrazi karty ingredienci receptu
*/
function RecipeIngredientsDisplay() {
    const { ingredients } = useContext(YourRecipeContext);
    return (
        <Fragment>
            <div className='column'>
                {ingredients.map((ingredient, index) => (
                    <div key={ingredient.ingredients_id}>
                        <RecipeIngredientsCard ingredients={{
                            ...ingredient,
                            index
                        }} />
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default RecipeIngredientsDisplay;