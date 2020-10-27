import React, { Fragment, useContext } from 'react';
import { RecipeFormContext } from '../../context/recipeForm';
import StepCard from './stepCard';
function StepDisplay() {
    const { recipeStepsData, setRecipeStepsData } = useContext(RecipeFormContext);
    const { recipeSteps, tempSteps } = recipeStepsData;
    return (
        <Fragment>
            {recipeSteps.map((step, index) => (
                <div key={step.step_id}>
                    <StepCard step={{ ...step, index }} />
                </div>
            ))}
        </Fragment>
    )
}

export default StepDisplay;