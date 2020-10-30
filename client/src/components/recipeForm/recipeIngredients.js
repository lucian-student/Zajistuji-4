import React, { Fragment, useContext, useCallback } from 'react';
import { RecipeFormContext } from '../../context/recipeForm';
import RecipeIngredientsCard from './recipeIngredientsCard';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import withScrolling from 'react-dnd-scrolling';

const ScrollingComponent = withScrolling('div');

function RecipeIngredients() {
    const { recipeIngredients, setRecipeIngredients } = useContext(RecipeFormContext);
    const checkCanDrop = useCallback((item) => {
        if (recipeIngredients.some(ingredient => ingredient.ingredients_id === item.ingredients_id) &&
            item.status === 'yours') {
            return false;
        } else {
            return true;
        }
    }, [recipeIngredients]);
    // same list
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const dragCard = recipeIngredients[dragIndex];
        setRecipeIngredients(update(recipeIngredients, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]
            ]
        }));
    }, [recipeIngredients, setRecipeIngredients]);
    const [, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: (item, monitor) => {
            if (item.status === 'yours') {
                setRecipeIngredients(update(recipeIngredients, {
                    $push: [{
                        ingredients_id: item.ingredients_id,
                        user_id: item.user_id,
                        category: item.category,
                        name: item.name,
                        date_of_creation: item.date_of_creation
                    }]
                }))
            }
        }
    });
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Recipe Ingredients</h3>
            <div ref={drop}>
                <ScrollingComponent className='column'>
                    {recipeIngredients.map((ingredient, index) => (
                        <div key={ingredient.ingredients_id}>
                            <RecipeIngredientsCard ingredients={{
                                ...ingredient,
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

export default RecipeIngredients;