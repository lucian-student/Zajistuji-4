import React, { Fragment, useContext, useCallback } from 'react';
import { StepFormContext } from '../../context/stepForm';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import StepFormIngredientsCard from './stepFormIngredientsCard';
import withScrolling from 'react-dnd-scrolling';

const ScrollingComponent = withScrolling('div');

function FormStepIngredients() {
    const { formIngredientsData, setFormIngredientsData, noDrop } = useContext(StepFormContext);
    const { formIngredients, tempIngredients } = formIngredientsData;
    // drop check
    const checkCanDrop = useCallback((item) => {
        if (formIngredients.some(ingredient => ingredient.ingredients_id === item.ingredients_id) &&
            item.status === 'recipe') {
            return false;
        } else {
            return true;
        }
    }, [formIngredients]);
    // opacity
    const opacityCheck = (ingredients_id) => {
        if (formIngredients.some(ingredient => ingredient.ingredients_id === ingredients_id)) {
            return false
        }
        return true;
    }
    // same list
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const dragCard = tempIngredients[dragIndex];
        setFormIngredientsData(update(formIngredientsData, {
            tempIngredients: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }));
    }, [formIngredientsData, setFormIngredientsData, tempIngredients]);
    // from different list 
    const moveItem2 = useCallback((dragIndex, hoverIndex, item) => {
        setFormIngredientsData(update(formIngredientsData, {
            tempIngredients: {
                $splice: [
                    [dragIndex, 0],
                    [hoverIndex, 0, {
                        ingredients_id: item.ingredients_id,
                        user_id: item.user_id,
                        category: item.category,
                        name: item.name,
                        date_of_creation: item.date_of_creation,
                        unit: '',
                        value: ''
                    }]
                ]
            }
        }));
    }, [formIngredientsData, setFormIngredientsData]);
    // confirm move
    const confirmMove = useCallback(() => {
        setFormIngredientsData(update(formIngredientsData, {
            recipeIngredients: { $set: tempIngredients }
        }));
    }, [formIngredientsData, setFormIngredientsData, tempIngredients]);
    // drop hook
    const [{ isOver }, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: (item, monitor) => {
            if (formIngredients.length > 0) {
                confirmMove();
            }
            if (formIngredients.length === 0) {
                setFormIngredientsData(update(formIngredientsData, {
                    formIngredients: {
                        $push: [{
                            ingredients_id: item.ingredients_id,
                            user_id: item.user_id,
                            category: item.category,
                            name: item.name,
                            date_of_creation: item.date_of_creation,
                            unit: '',
                            value: ''
                        }]
                    },
                    tempIngredients: {
                        $push: [{
                            ingredients_id: item.ingredients_id,
                            user_id: item.user_id,
                            category: item.category,
                            name: item.name,
                            date_of_creation: item.date_of_creation,
                            unit: '',
                            value: ''
                        }]
                    }
                }));
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Recipe Ingredients</h3>
            <div ref={drop}>
                <ScrollingComponent className='column'>
                    {!isOver ? (
                        <Fragment>
                            {formIngredients.map((ingredient, index) => (
                                <div key={ingredient.ingredients_id}>
                                    <StepFormIngredientsCard
                                        ingredients={{
                                            ...ingredient,
                                            index,
                                            checkCanDrop,
                                            opacityCheck,
                                            moveItem1,
                                            moveItem2,
                                            noDrop
                                        }} />
                                </div>
                            ))}
                        </Fragment>
                    ) : (
                            <Fragment>
                                {tempIngredients.map((ingredient, index) => (
                                    <div key={ingredient.ingredients_id}>
                                        <StepFormIngredientsCard
                                            ingredients={{
                                                ...ingredient,
                                                index,
                                                checkCanDrop,
                                                opacityCheck,
                                                moveItem1,
                                                moveItem2,
                                                noDrop
                                            }} />
                                    </div>
                                ))}
                            </Fragment>
                        )}
                </ScrollingComponent>
            </div>
        </Fragment>
    )
}

export default FormStepIngredients;