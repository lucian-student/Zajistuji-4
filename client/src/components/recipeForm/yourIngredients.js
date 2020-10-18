import React, { Fragment, useEffect, useContext } from 'react';
import { ingredientsQuery } from '../../queries/ingredients/defaultIngredients';
import { RecipeFormContext } from '../../context/recipeForm';
import YourIngredientsCard from '../../components/recipeForm/yourIngredientsCard';
import Button from 'react-bootstrap/Button';
import withScrolling from 'react-dnd-scrolling';

const ScrollingComponent = withScrolling('div');

function YourIngredients() {
    const { yourIngredientsPage, setYourIngredients, yourIngredients, setYourIngredientsPage } = useContext(RecipeFormContext);
    useEffect(() => {
        const reciveData = async () => {
            ingredientsQuery(yourIngredientsPage, setYourIngredients);
        }
        reciveData();
    }, [yourIngredientsPage, setYourIngredients]);

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
                        onClick={() => { setYourIngredientsPage(page => page + 1) }}>
                        More...
                    </Button>
                )}
            </ScrollingComponent>
        </Fragment>
    )
}

export default YourIngredients;