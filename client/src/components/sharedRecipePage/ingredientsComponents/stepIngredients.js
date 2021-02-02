import React from 'react';
import StepIngredientsCard from './StepIngredientsCard';
/*
Zobrazi ingredience kroku
*/
function StepIngredients({ properties: { ingredients } }) {
    return (
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
    )
}

export default StepIngredients;