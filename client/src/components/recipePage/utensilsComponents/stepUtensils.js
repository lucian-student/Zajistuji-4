import React, { Fragment } from 'react';

function StepUtensils({ utensils }) {
    return (
        <Fragment>
            <div className='column'>
                {utensils.map((utensil, index) => (
                    <div key={utensil.utensils_id}>
                        utensil
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default StepUtensils;
