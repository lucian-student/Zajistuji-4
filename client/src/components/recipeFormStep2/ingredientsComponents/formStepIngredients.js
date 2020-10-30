import React, { Fragment, useContext, useCallback } from 'react';
import { StepFormContext } from '../../../context/stepForm';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import StepFormIngredientsCard from './stepFormIngredientsCard';
import withScrolling from 'react-dnd-scrolling';

const ScrollingComponent = withScrolling('div');

function FormStepIngredients() {
    const { formIngredients, setFormIngredients } = useContext(StepFormContext);
    // drop check
    const checkCanDrop = useCallback((item) => {
        if (item.status === 'step') {
            return false;
        }
        if (formIngredients.some(ingredient => ingredient.ingredients_id === item.ingredients_id) &&
            item.status === 'recipe') {
            return false;
        } else {
            return true;
        }
    }, [formIngredients]);
    // same list
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const dragCard = formIngredients[dragIndex];
        setFormIngredients(update(formIngredients, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]
            ]
        }));
    }, [formIngredients, setFormIngredients]);
    const [, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: (item, monitor) => {
            if (item.status === 'recipe') {
                setFormIngredients(update(formIngredients, {
                    $push: [{
                        ingredients_id: item.ingredients_id,
                        category: item.category,
                        name: item.name,
                        unit: '',
                        value: ''
                    }]
                }));
            }
        }
    });
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Recipe Ingredients</h3>
            <div ref={drop}>
                <ScrollingComponent className='column'>
                    {formIngredients.map((ingredient, index) => (
                        <div key={ingredient.ingredients_id}>
                            <StepFormIngredientsCard
                                ingredients={{
                                    ...ingredient,
                                    index,
                                    checkCanDrop,
                                    moveItem1,
                                }} />
                        </div>
                    ))}
                </ScrollingComponent>
            </div>
        </Fragment>
    )
}

export default FormStepIngredients;