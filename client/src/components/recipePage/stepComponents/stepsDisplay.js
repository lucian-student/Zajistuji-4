import React, { Fragment, useEffect, useContext, useCallback } from 'react';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { recipeStepsQuery } from '../../../queries/recipeSteps/recipeStepsDefault';
import StepCard from './stepCard';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import { moveStep } from '../../../queries/recipeSteps/moveStep';
function StepsDisplay() {
    const { steps, setSteps, recipe: { recipie_id } } = useContext(YourRecipeContext);
    useEffect(() => {
        const reciveData = async () => {
            await recipeStepsQuery(recipie_id, setSteps);
        }
        reciveData();
    }, [setSteps, recipie_id]);
    // same list 
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const dragCard = steps[dragIndex];
        setSteps(update(steps, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]
            ]
        }));
    }, [steps, setSteps]);

    const [, drop] = useDrop({
        accept: 'STEP',
        drop(item, monitor) {
            if (item.originalIndex !== item.index) {
                const moveData = async () => {
                    await moveStep(item.step_id, item.originalIndex, item.index, recipie_id);
                }
                moveData();
            }
        }
    });
    return (
        <Fragment>
            <div ref={drop}>
                {steps.map((step, index) => (
                    <div key={step.step_id}>
                        <StepCard step={{
                            ...step,
                            index,
                            moveItem1
                        }} />
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default StepsDisplay;