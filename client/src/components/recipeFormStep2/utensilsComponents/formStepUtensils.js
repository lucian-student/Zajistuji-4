import React, { Fragment, useContext, useCallback } from 'react';
import { StepFormContext } from '../../../context/stepForm';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import StepFormUtensilCard from './stepFormUtensilsCard';
import withScrolling from 'react-dnd-scrolling';

const ScrollingComponent = withScrolling('div');

function FormStepUtensils() {
    const { formUtensils, setFormUtensils } = useContext(StepFormContext);
    // drop check
    const checkCanDrop = useCallback((item) => {
        if (item.status === 'step') {
            return false;
        }
        if (formUtensils.some(utensil => utensil.utensils_id === item.utensils_id) &&
            item.status === 'recipe') {
            return false;
        } else {
            return true;
        }
    }, [formUtensils]);
    // same list
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const dragCard = formUtensils[dragIndex];
        setFormUtensils(update(formUtensils, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]
            ]
        }));
    }, [formUtensils, setFormUtensils]);
    const [, drop] = useDrop({
        accept: 'UTENSILS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: (item, monitor) => {
            if (item.status === 'recipe') {
                setFormUtensils(update(formUtensils, {
                    $push: [{
                        utensils_id: item.utensils_id,
                        name: item.name,
                    }]
                }));
            }
        }
    });
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Recipe Utensils</h3>
            <div ref={drop}>
                <ScrollingComponent className='column'>
                    {formUtensils.map((utensil, index) => (
                        <div key={utensil.utensils_id}>
                            <StepFormUtensilCard
                                utensil={{
                                    ...utensil,
                                    index,
                                    checkCanDrop,
                                    moveItem1,
                                }} />
                        </div>
                    ))}
                </ScrollingComponent>
            </div>
        </Fragment>
    )
}

export default FormStepUtensils;