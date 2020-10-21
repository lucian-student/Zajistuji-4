import React, { Fragment, useContext, useCallback } from 'react';
import { RecipeFormContext } from '../../context/recipeForm';
import RecipeUtensilCard from './recipeUtensilCard';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import withScrolling from 'react-dnd-scrolling';

const ScrollingComponent = withScrolling('div');

function RecipeUtensils() {
    const { recipeUtensilsData, setRecipeUtensilsData }
        = useContext(RecipeFormContext);
    const { recipeUtensils, tempUtensils } = recipeUtensilsData;

    const checkCanDrop = useCallback((item) => {
        if (recipeUtensils.some(utensil => utensil.utensils_id === item.utensils_id) &&
            item.status === 'yours') {
            return false;
        } else {
            return true;
        }
    }, [recipeUtensils]);
    const opacityCheck = (utensils_id) => {
        if (recipeUtensils.some(utensil => utensil.utensils_id === utensils_id)) {
            return false
        }
        return true;
    }
    // same list
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const dragCard = tempUtensils[dragIndex];
        setRecipeUtensilsData(update(recipeUtensilsData, {
            tempUtensils: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }));
    }, [recipeUtensilsData, setRecipeUtensilsData, tempUtensils]);
    // from different list 
    const moveItem2 = useCallback((dragIndex, hoverIndex, item) => {
        setRecipeUtensilsData(update(recipeUtensilsData, {
            tempUtensils: {
                $splice: [
                    [dragIndex, 0],
                    [hoverIndex, 0, {
                        utensils_id: item.utensils_id,
                        user_id: item.user_id,
                        name: item.name,
                        date_of_creation: item.date_of_creation
                    }]
                ]
            }
        }));
    }, [recipeUtensilsData, setRecipeUtensilsData]);
    // confirm move
    const confirmMove = useCallback(() => {
        setRecipeUtensilsData(update(recipeUtensilsData, {
            recipeUtensils: { $set: tempUtensils }
        }));
    }, [recipeUtensilsData, setRecipeUtensilsData, tempUtensils]);

    const [{ isOver }, drop] = useDrop({
        accept: 'UTENSILS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: (item, monitor) => {
            if (recipeUtensils.length > 0) {
                confirmMove();
            }
            if (recipeUtensils.length === 0) {
                setRecipeUtensilsData(update(recipeUtensilsData, {
                    recipeUtensils: {
                        $push: [{
                            utensils_id: item.utensils_id,
                            user_id: item.user_id,
                            name: item.name,
                            date_of_creation: item.date_of_creation
                        }]
                    },
                    tempUtensils: {
                        $push: [{
                            utensils_id: item.utensils_id,
                            user_id: item.user_id,
                            name: item.name,
                            date_of_creation: item.date_of_creation
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
            <h3 style={{ textAlign: 'center' }}>Recipe utensils</h3>
            <div ref={drop}>
                <ScrollingComponent className='column'>
                    {!isOver ? (
                        <Fragment>
                            {recipeUtensilsData.recipeUtensils.map((utensil, index) => (
                                <div key={utensil.utensils_id}>
                                    <RecipeUtensilCard utensil={{
                                        ...utensil,
                                        index,
                                        checkCanDrop,
                                        opacityCheck,
                                        moveItem1,
                                        moveItem2
                                    }} />
                                </div>
                            ))}
                        </Fragment>
                    ) : (
                            <Fragment>
                                {recipeUtensilsData.tempUtensils.map((utensil, index) => (
                                    <div key={utensil.utensils_id}>
                                        <RecipeUtensilCard utensil={{
                                            ...utensil,
                                            index,
                                            checkCanDrop,
                                            opacityCheck,
                                            moveItem1,
                                            moveItem2
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

export default RecipeUtensils;