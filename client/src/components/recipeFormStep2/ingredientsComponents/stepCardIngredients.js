import React, { Fragment } from 'react';
import withScrolling from 'react-dnd-scrolling';
import StepIngredientsCard from './stepIngredientsCard';
const ScrollingComponent = withScrolling('div');

function StepCardIngredients({ properties: { ingredients, tempInrgedients, index } }) {
    return (
        <Fragment>
            <div>
                <ScrollingComponent className='column'>
                    {ingredients.map((ingredient, index) => (
                        <div key={ingredient.ingredients_id}>
                            <StepIngredientsCard
                                ingredients={{
                                    ...ingredient,
                                    index
                                }} />
                        </div>
                    ))}
                </ScrollingComponent>
            </div>
        </Fragment>
    )
}

export default StepCardIngredients;