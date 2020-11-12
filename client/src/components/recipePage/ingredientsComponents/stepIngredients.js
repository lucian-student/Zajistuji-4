import React, { Fragment, useContext, useCallback } from 'react';
import StepIngredientsCard from './stepIngredientsCard';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { changeStep } from '../../../queries/stepIngredients/changeStep';
import { createIngredients } from '../../../queries/stepIngredients/creatIngredients';
import withScrolling from 'react-dnd-scrolling';
const ScrollingComponent = withScrolling('div');

function StepIngredients({ properties }) {
    const {
        ingredients,
        step_id,
        index
    } = properties;
    const { setSteps, steps, recipe: { recipie_id } } = useContext(YourRecipeContext);
    function checkCanDrop(item) {
        switch (item.status) {
            case 'recipe':
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
        setSteps(update(steps, {
            [index]: {
                ingredients: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, card]
                    ]
                }
            }
        }));
    }, [steps, setSteps, ingredients, index])
    //different list 

    //recipe drop
    const [, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: async (item, monitor) => {
            const card = {
                step_id: step_id,
                ingredients_id: item.ingredients_id,
                category: item.category,
                name: item.name,
                unit: item.status === 'recipe' ? '' : item.unit,
                value: item.status === 'recipe' ? '' : item.value
            }
            if (item.status === 'recipe') {
                await createIngredients(card, index, steps, setSteps, recipie_id);
            }
            if (item.status === 'step' && item.ultraOriginalStepIndex !== index) {
                await changeStep(
                    item.ingredients_id,
                    item.index,
                    item.ultraOriginalStepIndex,
                    index, step_id, steps,
                    setSteps, recipie_id
                );
            }
        }
    });
    return (
        <Fragment>
            <div ref={drop}>
                <ScrollingComponent className='column'>
                    {ingredients.map((ingredient, index) => (
                        <div key={ingredient.ingredients_id}>
                            <StepIngredientsCard ingredients={{
                                ...ingredient,
                                index,
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

export default StepIngredients;
