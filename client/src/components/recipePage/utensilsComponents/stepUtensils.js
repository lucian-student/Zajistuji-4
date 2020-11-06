import React, { Fragment } from 'react';
import StepUtensilCard from './stepUtensilCard';
function StepUtensils({ utensils }) {
    return (
        <Fragment>
            <div className='column'>
                {utensils.map((utensil, index) => (
                    <div key={utensil.utensils_id}>
                        <StepUtensilCard utensil={{
                            ...utensils,
                            index
                        }} />
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default StepUtensils;
