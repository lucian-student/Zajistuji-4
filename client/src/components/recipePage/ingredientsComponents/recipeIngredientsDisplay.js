import React, { Fragment, useEffect, useContext } from 'react';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { recipeIngredientsQuery } from '../../../queries/recipeIngredients/recipeIngredientsDefault';
import IngredientsCard from './ingredientsCard';
function RecipeIngredientsDisplay() {
    const { ingredients, setIngredients, recipe: { recipie_id } } = useContext(YourRecipeContext);
    useEffect(() => {
        const reciveData = async () => {
            await recipeIngredientsQuery(recipie_id, setIngredients)
        };
        reciveData();
    }, [recipie_id, setIngredients])
    return (
        <Fragment>
            <div className='column'>
                {ingredients.map((ingredient, index) => (
                    <div key={ingredient.ingredients_id}>
                        <IngredientsCard ingredients={{
                            ...ingredient,
                            index
                        }} />
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default RecipeIngredientsDisplay;