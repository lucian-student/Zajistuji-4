import React, { Fragment, useContext } from 'react';
import { StepFormContext } from '../../../context/stepForm';
import withScrolling from 'react-dnd-scrolling';
import StepFormUtensilCard from './stepFormUtensilsCard';
const ScrollingComponent = withScrolling('div');

function FormStepUtensils() {
    const { formUtensils } = useContext(StepFormContext);
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Step Utensils</h3>
            <div>
                <ScrollingComponent className='column'>
                    {formUtensils.map((utensil, index) => (
                        <div key={utensil.utensils_id}>
                            <StepFormUtensilCard
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

export default FormStepUtensils;