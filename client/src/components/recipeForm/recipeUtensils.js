import React, { Fragment, useContext, useCallback } from 'react';
import { RecipeFormContext } from '../../context/recipeForm';
import RecipeUtensilCard from './recipeUtensilCard';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import withScrolling from 'react-dnd-scrolling';
/*
nacini receptu v prvnim kroku formulare na recepty
*/
const ScrollingComponent = withScrolling('div');

function RecipeUtensils() {
    const { recipeUtensils, setRecipeUtensils } = useContext(RecipeFormContext);
    const checkCanDrop = useCallback((item) => {
        if (recipeUtensils.some(utensil => utensil.utensils_id === item.utensils_id) &&
            item.status === 'yours') {
            return false;
        } else {
            return true;
        }
    }, [recipeUtensils]);
    // same list
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const dragCard = recipeUtensils[dragIndex];
        setRecipeUtensils(update(recipeUtensils, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]
            ]
        }));
    }, [setRecipeUtensils, recipeUtensils]);
    // from different list 
    const [, drop] = useDrop({
        accept: 'UTENSILS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: (item, monitor) => {
            if (item.status === 'yours') {
                setRecipeUtensils(update(recipeUtensils, {
                    $push: [{
                        utensils_id: item.utensils_id,
                        user_id: item.user_id,
                        name: item.name,
                        date_of_creation: item.date_of_creation
                    }]
                }));
            }
        }
    });
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Recipe utensils</h3>
            <div ref={drop}>
                <ScrollingComponent className='column'>
                    {recipeUtensils.map((utensil, index) => (
                        <div key={utensil.utensils_id}>
                            <RecipeUtensilCard utensil={{
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

export default RecipeUtensils;