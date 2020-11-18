import React, { Fragment, useEffect, useContext } from 'react';
import { YourRecipesContext } from '../../context/yourRecipes';
import { recipeQuery } from '../../queries/recipes/defaultRecipeQuery';
import Button from 'react-bootstrap/Button';
import RecipeCard from './recipeCard';
function RecipeDisplay() {
    const { yourRecipes, setYourRecipes, yourRecipesPage, setYourRecipesPage, source } = useContext(YourRecipesContext);
    useEffect(() => {
        const reciveData = async () => {
            await recipeQuery(yourRecipesPage, setYourRecipes, source);
        }
        reciveData();
    }, [yourRecipesPage, setYourRecipes, source]);
    return (
        <Fragment>
            {yourRecipes.map((recipe, index) => (
                <div key={recipe.recipie_id}>
                    <RecipeCard recipe={{
                        ...recipe,
                        index
                    }} />
                </div>
            ))}
            {(yourRecipes.length / ((yourRecipesPage + 1) * 10)) >= 1 && (
                <Button variant='light' style={{ width: '100%' }}
                    onClick={() => { setYourRecipesPage(page => page + 1) }}>
                    More...
                </Button>
            )}
        </Fragment>
    )
}

export default RecipeDisplay;