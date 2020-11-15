import React from 'react';
import StepUtensilCard from './stepUtensilCard';
function StepUtensils({ properties }) {
    const {
        utensils
    } = properties;
    return (
        <div className='column'>
            {utensils.map((utensil, index) => (
                <div key={utensil.utensils_id}>
                    <StepUtensilCard utensil={{
                        ...utensil,
                        index
                    }} />
                </div>
            ))}
        </div>
    )
}

export default StepUtensils;