import React, { Fragment, useContext, useCallback } from 'react';
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
    //same list 
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const card = ingredients[dragIndex];
        setRecipeSteps(update(recipeSteps, {
            [index]: {
                ingredients: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, card]
                    ]
                }
            }
        }));
    }, [recipeSteps, setRecipeSteps, ingredients, index])
    //different list 

    //recipe drop
    const [, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: (item, monitor) => {
            const card = {
                ingredients_id: item.ingredients_id,
                category: item.category,
                name: item.name,
                unit: item.status === 'recipe' ? '' : item.unit,
                value: item.value === 'recipe' ? '' : item.value
            }
            if (item.status === 'recipe') {
                setRecipeSteps(update(recipeSteps, {
                    [index]: {
                        ingredients: {
                            $push: [card]
                        }
                    }
                }))
            }
            if (item.status === 'step' && item.ultraOriginalStepIndex !== index) {
                setRecipeSteps(update(recipeSteps, {
                    [index]: {
                        ingredients: {
                            $push: [card]
                        }
                    },
                    [item.ultraOriginalStepIndex]: {
                        ingredients: {
                            $splice: [
                                [item.index, 1]
                            ]
                        }
                    }
                }))
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
                                    checkCanDrop,
                                    moveItem1
                                }} />
                        </div>
                    ))}
                </ScrollingComponent>
            </div>
        </Fragment>
    )
}

export default StepCardIngredients;