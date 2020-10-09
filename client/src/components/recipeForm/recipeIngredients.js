import React, { Fragment, useContext } from 'react';
import { RecipeFormContext } from '../../context/recipeForm';
import YourIngredientsCard from './yourIngredientsCard';
function RecipeIngredients() {
    const { recipeIngredients } = useContext(RecipeFormContext);

    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Recipe Ingredients</h3>
            <div className='column'>
                {recipeIngredients.map((ingredient, index) => (
                    <div key={ingredient.ingredients_id}>
                        <YourIngredientsCard ingredients={{
                            ...ingredient,
                            index
                        }} />
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default RecipeIngredients;