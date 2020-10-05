import React, { Fragment, useEffect, useContext } from 'react';
import { IngredientsAndUtensilsContext } from '../../context/ingredientsAndUtensils';
import IngredientsCard from './ingredientsCard';
import Button from 'react-bootstrap/Button';
function IngredinetsDisplay() {
    const { ingredientsPage, setIngredientsPage, setIngredientsData, ingredients } = useContext(IngredientsAndUtensilsContext);
    useEffect(() => {
        setIngredientsData(ingredientsPage);
    }, [ingredientsPage, setIngredientsData]);
    return (
        <Fragment>
            {ingredients.map((ingredient, index) => (
                <div key={ingredient.ingredients_id}>
                    <IngredientsCard ingredients={{
                        ...ingredient,
                        index
                    }} />
                    <br />
                </div>
            ))}
            {(ingredients.length / ((ingredientsPage + 1) * 10)) >= 1 && (
                <Button variant='light' style={{ width: '100%' }}
                    onClick={() => { setIngredientsPage(page => page + 1) }}>
                    More...
                </Button>
            )}
        </Fragment>
    )
}

export default IngredinetsDisplay;