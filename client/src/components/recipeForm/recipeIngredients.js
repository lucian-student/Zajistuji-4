import React, { Fragment, useContext } from 'react';
import { RecipeFormContext } from '../../context/recipeForm';
import RecipeIngredientsCard from './recipeIngredientsCard';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import withScrolling from 'react-dnd-scrolling';

const ScrollingComponent = withScrolling('div');

function RecipeIngredients() {
    const { recipeIngredientsData: { recipeIngredients, tempIngredients } } = useContext(RecipeFormContext);
    const [{ isOver }, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop: (item, monitor) => {
            return true;
        },
        drop: (item, monitor) => {

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
                    {isOver ? (
                        <Fragment>
                            {recipeIngredients.map((ingredient, index) => (
                                <div key={ingredient.ingredients_id}>
                                    <RecipeIngredientsCard ingredients={{
                                        ...ingredient,
                                        index
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
                                            index
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