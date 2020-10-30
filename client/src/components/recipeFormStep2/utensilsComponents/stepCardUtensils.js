import React, { Fragment, useContext, useCallback } from 'react';
import withScrolling from 'react-dnd-scrolling';
import StepUtensilsCard from './stepUtensilsCard';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { RecipeFormContext } from '../../../context/recipeForm';
const ScrollingComponent = withScrolling('div');

function StepCardUtensils({ properties }) {
    const {
        utensils,
        index,
        step_id
    } = properties;
    const { recipeSteps, setRecipeSteps } = useContext(RecipeFormContext);
    function checkCanDrop(item) {
        switch (item.status) {
            case 'recipe':
                if (utensils.some(utensil => utensil.utensils_id === item.utensils_id)) {
                    return false;
                }
                return true;
            case 'step':
                if (item.step_id !== step_id) {
                    if (utensils.some(utensils => utensils.utensils_id === item.utensils_id)) {
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
        const card = utensils[dragIndex];
        setRecipeSteps(update(recipeSteps, {
            [index]: {
                utensils: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, card]
                    ]
                }
            }
        }));
    }, [recipeSteps, setRecipeSteps, utensils, index])

    const [, drop] = useDrop({
        accept: 'UTENSILS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: (item, monitor) => {
            const card = {
                utensils_id: item.utensils_id,
                name: item.name
            }
            if (item.status === 'recipe') {
                setRecipeSteps(update(recipeSteps, {
                    [index]: {
                        utensils: {
                            $push: [card]
                        }
                    }
                }))
            }
            if (item.status === 'step' && item.ultraOriginalStepIndex !== index) {
                setRecipeSteps(update(recipeSteps, {
                    [index]: {
                        utensils: {
                            $push: [card]
                        }
                    },
                    [item.ultraOriginalStepIndex]: {
                        utensils: {
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
                    {utensils.map((utensil, index) => (
                        <div key={utensil.utensils_id}>
                            <StepUtensilsCard
                                utensil={{
                                    ...utensil,
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

export default StepCardUtensils;