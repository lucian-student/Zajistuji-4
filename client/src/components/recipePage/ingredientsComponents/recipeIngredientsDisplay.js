import React, { Fragment, useContext } from 'react';
import { YourRecipeContext } from '../../../context/yourRecipe';
import IngredientsCard from './ingredientsCard';
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
                        <IngredientsCard ingredients={{
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