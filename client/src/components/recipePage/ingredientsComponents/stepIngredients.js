import React, { Fragment } from 'react';

function StepIngredients({ ingredients }) {
    return (
        <Fragment>
            <div className='column'>
                {ingredients.map((ingredient, index) => (
                    <div key={ingredient.ingredients_id}>
                        ingredients
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default StepIngredients;
