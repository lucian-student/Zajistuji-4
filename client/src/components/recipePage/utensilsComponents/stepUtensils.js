import React, { Fragment, useCallback, useContext } from 'react';
import StepUtensilCard from './stepUtensilCard';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import withScrolling from 'react-dnd-scrolling';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { createUtensil } from '../../../queries/stepUtensils/createUtensils';
import { changeStep } from '../../../queries/stepUtensils/changeStep';
/*
Zobrazi karty nacini kroku
*/
const ScrollingComponent = withScrolling('div');
function StepUtensils({ properties }) {
    const {
        utensils,
        index,
        step_id
    } = properties;
    const { setSteps, steps, recipe: { recipie_id } } = useContext(YourRecipeContext);
    function checkCanDrop(item) {
        switch (item.status) {
            case 'recipe':
                return true;
            case 'step':
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
        setSteps(update(steps, {
            [index]: {
                utensils: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, card]
                    ]
                }
            }
        }));
    }, [steps, setSteps, utensils, index]);

    const [, drop] = useDrop({
        accept: 'UTENSILS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: async (item, monitor) => {
            const card = {
                step_id: step_id,
                utensils_id: item.utensils_id,
                name: item.name
            }
            if (item.status === 'recipe') {
                await createUtensil(card, index, steps, setSteps, recipie_id, item.source);
            }
            if (item.status === 'step' && item.ultraOriginalStepIndex !== index) {
                await changeStep(
                    item.utensils_id,
                    item.index,
                    item.ultraOriginalStepIndex,
                    index, step_id, steps,
                    setSteps, recipie_id,
                    item.source
                );
            }
        }
    });
    return (
        <Fragment>
            <div ref={drop}>
                <ScrollingComponent className='column'>
                    {utensils.map((utensil, index) => (
                        <div key={utensil.utensils_id}>
                            <StepUtensilCard utensil={{
                                ...utensil,
                                index,
                                originalStepIndex: properties.index,
                                ultraOriginalStepIndex: properties.index,
                                moveItem1,
                                checkCanDrop
                            }} />
                        </div>
                    ))}
                </ScrollingComponent>
            </div>
        </Fragment>
    )
}

export default StepUtensils;
