import React, { Fragment } from 'react';
import StepIngredientsCard from './stepIngredientsCard';

function StepIngredients({ ingredients }) {
    return (
        <Fragment>
            <div className='column'>
                {ingredients.map((ingredient, index) => (
                    <div key={ingredient.ingredients_id}>
                        <StepIngredientsCard ingredients={{
                            ...ingredient,
                            index
                        }} />
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default StepIngredients;
