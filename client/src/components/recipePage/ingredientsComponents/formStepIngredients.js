import React, { Fragment, useContext } from 'react';
import { StepFormContext } from '../../../context/stepForm';
import StepFormIngredientsCard from './stepFormIngredientsCard';
import withScrolling from 'react-dnd-scrolling';

const ScrollingComponent = withScrolling('div');

function FormStepIngredients() {
    const { formIngredients } = useContext(StepFormContext);
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Step Ingredients</h3>
            <div>
                <ScrollingComponent className='column'>
                    {formIngredients.map((ingredient, index) => (
                        <StepFormIngredientsCard
                            key={ingredient.ingredients_id}
                            ingredients={{
                                ...ingredient,
                                index
                            }} />
                    ))}
                </ScrollingComponent>
            </div>
        </Fragment>
    )
}

export default FormStepIngredients;