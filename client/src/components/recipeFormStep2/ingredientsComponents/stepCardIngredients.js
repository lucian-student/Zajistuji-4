import React, { Fragment, useContext, useCallback, useEffect } from 'react';
import withScrolling from 'react-dnd-scrolling';
import StepIngredientsCard from './stepIngredientsCard';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { RecipeFormContext } from '../../../context/recipeForm';
const ScrollingComponent = withScrolling('div');


function StepCardIngredients({ properties }) {
    const {
        ingredients,
        index,
        step_id
    } = properties;
    useEffect(() => {
        console.log(ingredients);
    }, [ingredients]);
    const { recipeSteps, setRecipeSteps } = useContext(RecipeFormContext);
    function checkCanDrop(item) {
        switch (item.status) {
            case 'recipe':
                if (ingredients.some(ingredient => ingredient.ingredients_id === item.ingredients_id)) {
                    return false;
                }
                return true;
            case 'step':
                if (item.step_id !== step_id) {
                    if (ingredients.some(ingredient => ingredient.ingredients_id === item.ingredients_id)) {
                        return false;
                    }
                }
                return true;
            case 'form':
                return false;
            default:
                return false;
        }
    }
    //from same list
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const dragCard = ingredients[dragIndex];
        setRecipeSteps(update(recipeSteps, {
            [index]: {
                ingredients: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard]
                    ]
                }
            }
        }))
    }, [setRecipeSteps, recipeSteps, ingredients, index]);
    //different step
    const moveItem2 = useCallback((hoverIndex, item) => {
        const itemsIndex = item.index;
        const originalStepIndex = item.originalStepIndex;
        setRecipeSteps(update(recipeSteps, {
            [index]: {
                ingredients: {
                    $splice: [
                        [hoverIndex, 0, {
                            ingredients_id: item.ingredients_id,
                            category: item.category,
                            name: item.name,
                            unit: item.unit,
                            value: item.value
                        }]
                    ]
                }
            },
            [originalStepIndex]: {
                ingredients: {
                    $splice: [
                        [itemsIndex, 1]
                    ]
                }
            }
        }));
    }, [setRecipeSteps, recipeSteps, index]);
    //from recipe
    const moveFromRecipe = useCallback((item, hoverIndex) => {
        setRecipeSteps(update(recipeSteps, {
            [index]: {
                ingredients: {
                    $splice: [
                        [hoverIndex, 0, {
                            ingredients_id: item.ingredients_id,
                            category: item.category,
                            name: item.name,
                            unit: item.unit,
                            value: item.value
                        }]
                    ]
                }
            }
        }))
    }, [setRecipeSteps, recipeSteps, index]);
    //no drop differebt step index than original
    const differentNoDrop = useCallback((item) => {
        const lastIndex = item.index;
        const lastStepIndex = item.originalStepIndex;
        setRecipeSteps(update(recipeSteps, {
            [lastStepIndex]: {
                ingredients: {
                    $splice: [
                        [lastIndex, 1]
                    ]
                }
            }
        }))

    }, [setRecipeSteps, recipeSteps])
    const [, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: (item, monitor) => {
            if (ingredients.length === 0) {
                if (item.status !== 'step') {
                    setRecipeSteps(update(recipeSteps, {
                        [index]: {
                            ingredients: {
                                $push: [{
                                    ingredients_id: item.ingredients_id,
                                    category: item.category,
                                    name: item.name,
                                    unit: item.status === 'recipe' ? '' : item.unit,
                                    value: item.value === 'recipe' ? '' : item.value
                                }]
                            }
                        }
                    }));
                } else {
                    const itemsIndex = item.index;
                    const originalStepIndex = item.originalStepIndex;
                    setRecipeSteps(update(recipeSteps, {
                        [index]: {
                            ingredients: {
                                $push: [{
                                    ingredients_id: item.ingredients_id,
                                    category: item.category,
                                    name: item.name,
                                    unit: item.status === 'recipe' ? '' : item.unit,
                                    value: item.value === 'recipe' ? '' : item.value
                                }]
                            }
                        },
                        [originalStepIndex]: {
                            ingredients: {
                                $splice: [
                                    [itemsIndex, 1]
                                ]
                            }
                        }
                    }));
                }

            }
        }
    });
    return (
        <Fragment>
            <div ref={drop}>
                <ScrollingComponent className='column'>
                    {ingredients.map((ingredient, index) => (
                        <div key={ingredient.ingredients_id}>
                            <StepIngredientsCard
                                ingredients={{
                                    ...ingredient,
                                    index,
                                    step_id,
                                    originalStepIndex: properties.index,
                                    ultraOriginalStepIndex: properties.index,
                                    moveItem2,
                                    checkCanDrop,
                                    moveItem1,
                                    moveFromRecipe,
                                    differentNoDrop
                                }} />
                        </div>
                    ))}
                </ScrollingComponent>
            </div>
        </Fragment>
    )
}

export default StepCardIngredients;