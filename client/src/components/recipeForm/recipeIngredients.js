import React, { Fragment, useContext, useCallback } from 'react';
import { RecipeFormContext } from '../../context/recipeForm';
import RecipeIngredientsCard from './recipeIngredientsCard';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import withScrolling from 'react-dnd-scrolling';

const ScrollingComponent = withScrolling('div');

function RecipeIngredients() {
    const { recipeIngredientsData,
        setRecipeIngredientsData,
        noDrop } = useContext(RecipeFormContext);
    const { recipeIngredients, tempIngredients } = recipeIngredientsData;
    const checkCanDrop = useCallback((item) => {
        if (recipeIngredients.some(ingredient => ingredient.ingredients_id === item.ingredients_id) &&
            item.status === 'yours') {
            return false;
        } else {
            return true;
        }
    }, [recipeIngredients]);
    const opacityCheck = (ingredients_id) => {
        if (recipeIngredients.some(ingredient => ingredient.ingredients_id === ingredients_id)) {
            return false
        }
        return true;
    }
    // same list
    const moveItem1 = useCallback((dragIndex, hoverIndex) => {
        const dragCard = tempIngredients[dragIndex];
        setRecipeIngredientsData(update(recipeIngredientsData, {
            tempIngredients: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }));
    }, [recipeIngredientsData, setRecipeIngredientsData, tempIngredients]);
    // from different list 
    const moveItem2 = useCallback((dragIndex, hoverIndex, item) => {
        setRecipeIngredientsData(update(recipeIngredientsData, {
            tempIngredients: {
                $splice: [
                    [dragIndex, 0],
                    [hoverIndex, 0, {
                        ingredients_id: item.ingredients_id,
                        user_id: item.user_id,
                        category: item.category,
                        name: item.name,
                        date_of_creation: item.date_of_creation
                    }]
                ]
            }
        }));
    }, [recipeIngredientsData, setRecipeIngredientsData]);
    // confirm move
    const confirmMove = useCallback(() => {
        setRecipeIngredientsData(update(recipeIngredientsData, {
            recipeIngredients: { $set: tempIngredients }
        }));
    }, [recipeIngredientsData, setRecipeIngredientsData, tempIngredients]);

    const [{ isOver }, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop: (item, monitor) => {
            return checkCanDrop(item);
        },
        drop: (item, monitor) => {
            if (recipeIngredients.length > 0) {
                confirmMove();
            }
            if (recipeIngredients.length === 0) {
                setRecipeIngredientsData(update(recipeIngredientsData, {
                    recipeIngredients: {
                        $push: [{
                            ingredients_id: item.ingredients_id,
                            user_id: item.user_id,
                            category: item.category,
                            name: item.name,
                            date_of_creation: item.date_of_creation
                        }]
                    },
                    tempIngredients: {
                        $push: [{
                            ingredients_id: item.ingredients_id,
                            user_id: item.user_id,
                            category: item.category,
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
            <h3 style={{ textAlign: 'center' }}>Recipe Ingredients</h3>
            <div ref={drop}>
                <ScrollingComponent className='column'>
                    {!isOver ? (
                        <Fragment>
                            {recipeIngredients.map((ingredient, index) => (
                                <div key={ingredient.ingredients_id}>
                                    <RecipeIngredientsCard ingredients={{
                                        ...ingredient,
                                        index,
                                        checkCanDrop,
                                        opacityCheck,
                                        moveItem1,
                                        moveItem2,
                                        noDrop
                                    }} />
                                </div>
                            ))}
                        </Fragment>
                    ) : (
                            <Fragment>
                                {tempIngredients.map((ingredient, index) => (
                                    <div key={ingredient.ingredients_id}>
                                        <RecipeIngredientsCard ingredients={{
                                            ...ingredient,
                                            index,
                                            checkCanDrop,
                                            opacityCheck,
                                            moveItem1,
                                            moveItem2,
                                            noDrop
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

export default RecipeIngredients;