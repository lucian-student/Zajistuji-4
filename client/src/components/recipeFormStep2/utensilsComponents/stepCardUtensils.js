import React, { Fragment } from 'react';
import withScrolling from 'react-dnd-scrolling';
import StepUtensilsCard from './stepUtensilsCard';
const ScrollingComponent = withScrolling('div');

function StepCardUtensils({ properties: { utensils, tempUtensils, index } }) {
    return (
        <Fragment>
            <div>
                <ScrollingComponent className='column'>
                    {utensils.map((utensil, index) => (
                        <div key={utensil.utensils_id}>
                            <StepUtensilsCard
                                utensil={{
                                    ...utensil,
                                    index
                                }} />
                        </div>
                    ))}
                </ScrollingComponent>
            </div>
        </Fragment>
    )
}

export default StepCardUtensils;