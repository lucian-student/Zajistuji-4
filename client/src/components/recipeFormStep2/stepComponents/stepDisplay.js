import React, { Fragment, useCallback, useContext } from 'react';
import { RecipeFormContext } from '../../../context/recipeForm';
import { useDrop } from 'react-dnd';
import StepCard from './stepCard';
import withScrolling from 'react-dnd-scrolling';
import update from 'immutability-helper';

const ScrollingComponent = withScrolling('div');
function StepDisplay() {
    const { recipeStepsData, setRecipeStepsData } = useContext(RecipeFormContext);
    const { recipeSteps, tempSteps } = recipeStepsData;
    // same list
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const dragCard = tempSteps[dragIndex];
        setRecipeStepsData(update(recipeStepsData, {
            tempSteps: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }));
    }, [recipeStepsData, setRecipeStepsData, tempSteps]);
    // confirm move
    const confirmMove = useCallback(() => {
        setRecipeStepsData(update(recipeStepsData, {
            recipeSteps: { $set: tempSteps }
        }));
    }, [recipeStepsData, setRecipeStepsData, tempSteps]);

    const noDrop = useCallback(() => {
        setRecipeStepsData(update(recipeStepsData, {
            tempSteps: { $set: recipeSteps }
        }))
    }, [recipeStepsData, setRecipeStepsData, recipeSteps]);
    const [{ isOver }, drop] = useDrop({
        accept: 'STEP',
        drop: (item, monitor) => {
            if (recipeSteps.length > 0) {
                confirmMove();
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <Fragment>
            <div ref={drop}>
                <ScrollingComponent>
                    {!isOver ? (
                        <Fragment>
                            {recipeSteps.map((step, index) => (
                                <div key={step.step_id}>
                                    <StepCard step={{
                                        ...step,
                                        index,
                                        moveItem1,
                                        noDrop,
                                        isOver
                                    }} />
                                </div>
                            ))}
                        </Fragment>
                    ) : (
                            <Fragment>
                                {tempSteps.map((step, index) => (
                                    <div key={step.step_id}>
                                        <StepCard step={{
                                            ...step,
                                            index,
                                            moveItem1,
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

export default StepDisplay;