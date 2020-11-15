import React, { Fragment, useEffect, useContext } from 'react';
import { recipeStepsQuery } from '../../../queries/recipeSteps/recipeStepsDefault';
import { YourRecipeContext } from '../../../context/yourRecipe';
import StepCard from './stepCard';
function StepDisplay() {
    const { steps, setSteps, recipe: { recipie_id } } = useContext(YourRecipeContext);
    useEffect(() => {
        const reciveData = async () => {
            await recipeStepsQuery(recipie_id, setSteps);
        }
        reciveData();
    }, [setSteps, recipie_id]);
    return (
        <Fragment>
            {steps.map((step, index) => (
                <div key={step.step_id}>
                    <StepCard step={{
                        ...step,
                        index,
                    }} />
                </div>
            ))}
        </Fragment>
    )
}

export default StepDisplay;