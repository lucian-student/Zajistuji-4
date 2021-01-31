import React, { Fragment, useEffect, useState } from 'react';
import { ingredientsQuery } from '../../queries/ingredients/defaultIngredients';
import YourIngredientsCard from '../../components/recipeForm/yourIngredientsCard';
import Button from 'react-bootstrap/Button';
import withScrolling from 'react-dnd-scrolling';
import axios from 'axios';
/*
zobrazi karty vasich ingredienci v prvnim kroku
*/
const ScrollingComponent = withScrolling('div');
function YourIngredients() {
    const [yourIngredientsPage, setyouIngredientsPage] = useState(0);
    const [yourIngredients, setYourIngredients] = useState([]);
    useEffect(() => {
        const source = axios.CancelToken.source();
        const reciveData = async () => {
            ingredientsQuery(yourIngredientsPage, setYourIngredients, source);
        }
        reciveData();
        return () => {
            source.cancel('canceled');
        }
    }, [yourIngredientsPage, setYourIngredients, setyouIngredientsPage]);

    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Your Ingredients</h3>
            <ScrollingComponent className='column'>
                {yourIngredients.map((ingredient, index) => (
                    <div key={ingredient.ingredients_id}>
                        <YourIngredientsCard ingredients={{
                            ...ingredient,
                            index
                        }} />
                    </div>
                ))}
                {(yourIngredients.length / ((yourIngredientsPage + 1) * 10)) >= 1 && (
                    <Button variant='light' style={{ width: '100%' }}
                        onClick={() => { setyouIngredientsPage(page => page + 1) }}>
                        More...
                    </Button>
                )}
            </ScrollingComponent>
        </Fragment>
    )
}

export default YourIngredients;