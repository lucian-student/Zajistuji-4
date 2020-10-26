import React, { Fragment, useContext, useCallback } from 'react';
import { StepFormContext } from '../../context/stepForm';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import StepFormUtensilCard from './stepFormUtensilsCard';
import withScrolling from 'react-dnd-scrolling';

const ScrollingComponent = withScrolling('div');

function FormStepUtensils() {
    const { formUtensilsData, setFormUtensilsData, noDrop2 } = useContext(StepFormContext);
    const { formUtensils, tempUtensils } = formUtensilsData;
    // drop check
    const checkCanDrop = useCallback((item) => {
        if (formUtensils.some(utensil => utensil.utensils_id === item.utensils_id) &&
            item.status === 'recipe') {
            return false;
        } else {
            return true;
        }
    }, [formUtensils]);
    // opacity
    const opacityCheck = (utensils_id) => {
        if (formUtensils.some(utensil => utensil.utensils_id === utensils_id)) {
            return false
        }
        return true;
    }
    // same list
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const dragCard = tempUtensils[dragIndex];
        setFormUtensilsData(update(formUtensilsData, {
            tempUtensils: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }));
    }, [formUtensilsData, setFormUtensilsData, tempUtensils]);
    // from different list 
    const moveItem2 = useCallback((dragIndex, hoverIndex, item) => {
        setFormUtensilsData(update(formUtensilsData, {
            tempUtensils: {
                $splice: [
                    [dragIndex, 0],
                    [hoverIndex, 0, {
                        utensils_id: item.utensils_id,
                        name: item.name,
                    }]
                ]
            }
        }));
    }, [formUtensilsData, setFormUtensilsData]);
    // confirm move
    const confirmMove = useCallback(() => {
        setFormUtensilsData(update(formUtensilsData, {
            formUtensils: { $set: tempUtensils }
        }));
    }, [formUtensilsData, setFormUtensilsData, tempUtensils]);
    // drop hook
    const [{ isOver }, drop] = useDrop({
        accept: 'UTENSILS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: (item, monitor) => {
            if (formUtensils.length > 0) {
                confirmMove();
            }
            if (formUtensils.length === 0) {
                setFormUtensilsData(update(formUtensilsData, {
                    formUtensils: {
                        $push: [{
                            utensils_id: item.utensils_id,
                            name: item.name,
                        }]
                    },
                    tempUtensils: {
                        $push: [{
                            utensils_id: item.utensils_id,
                            name: item.name,
                        }]
                    }
                }));
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Recipe Utensils</h3>
            <div ref={drop}>
                <ScrollingComponent className='column'>
                    {!isOver ? (
                        <Fragment>
                            {formUtensils.map((utensil, index) => (
                                <div key={utensil.utensils_id}>
                                    <StepFormUtensilCard
                                        utensil={{
                                            ...utensil,
                                            index,
                                            checkCanDrop,
                                            opacityCheck,
                                            moveItem1,
                                            moveItem2,
                                            noDrop2
                                        }} />
                                </div>
                            ))}
                        </Fragment>
                    ) : (
                            <Fragment>
                                {tempUtensils.map((utensil, index) => (
                                    <div key={utensil.utensils_id}>
                                        <StepFormUtensilCard
                                            utensil={{
                                                ...utensil,
                                                index,
                                                checkCanDrop,
                                                opacityCheck,
                                                moveItem1,
                                                moveItem2,
                                                noDrop2
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

export default FormStepUtensils;