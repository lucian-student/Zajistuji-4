import React, { Fragment, useCallback, useContext } from 'react';
import { RecipeFormContext } from '../../../context/recipeForm';
import { useDrop } from 'react-dnd';
import StepCard from './stepCard';
import withScrolling from 'react-dnd-scrolling';
import update from 'immutability-helper';

const ScrollingComponent = withScrolling('div');
function StepDisplay() {
    const { recipeSteps, setRecipeSteps } = useContext(RecipeFormContext);
    // same list
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const dragCard = recipeSteps[dragIndex];
        setRecipeSteps(update(recipeSteps, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]
            ]
        }));
    }, [recipeSteps, setRecipeSteps]);
    const [, drop] = useDrop({
        accept: 'STEP'
    });
    const removeItem = useCallback((index) => {
        setRecipeSteps(update(recipeSteps, {
            $splice: [
                [index, 1]
            ]
        }))
    }, [recipeSteps, setRecipeSteps])
    return (
        <Fragment>
            <div ref={drop}>
                <ScrollingComponent>
                    <Fragment>
                        {recipeSteps.map((step, index) => (
                            <div key={step.step_id}>
                                <StepCard step={{
                                    ...step,
                                    index,
                                    moveItem1,
                                    removeItem
                                }} />
                            </div>
                        ))}
                    </Fragment>
                </ScrollingComponent>
            </div>
        </Fragment>
    )
}

export default StepDisplay;