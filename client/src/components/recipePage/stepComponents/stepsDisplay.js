import React, { Fragment, useEffect, useContext, useCallback, useRef } from 'react';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { recipeStepsQuery } from '../../../queries/recipeSteps/recipeStepsDefault';
import StepCard from './stepCard';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import { moveStep } from '../../../queries/recipeSteps/moveStep';
import axios from 'axios';
/*
Zobrazi karty kroku receptu
*/
function StepsDisplay() {
    const displaySource = useRef(axios.CancelToken.source());
    const { steps, setSteps, recipe: { recipie_id }, source } = useContext(YourRecipeContext);
    useEffect(() => {
        const reciveData = async () => {
            await recipeStepsQuery(recipie_id, setSteps, source);
        }
        reciveData();
    }, [setSteps, recipie_id, source]);

    useEffect(() => {
        const cancelToken = displaySource.current;
        return () => {
            cancelToken.cancel('canceled');
        }
    }, [])
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
                    await moveStep(item.step_id, item.originalIndex, item.index, recipie_id, displaySource.current, moveItem1);
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
                            moveItem1,
                            source: displaySource
                        }} />
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default StepsDisplay;