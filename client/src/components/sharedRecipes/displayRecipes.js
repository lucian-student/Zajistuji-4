import React, { Fragment, useEffect, useState } from 'react';
import { newestRecipes } from '../../queries/sharedRecipeQueries/newestRecipes';
import { likedRecipes } from '../../queries/sharedRecipeQueries/likedRecipes';
import { popularRecipes } from '../../queries/sharedRecipeQueries/popularRecipes';
import RecipeCard from './recipeCard';
function DisplayRecipes({ properties: { route, setRoute, options } }) {
    const { routeName, page } = route;
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const reciveData = async () => {
            switch (routeName) {
                case options[0]:
                    await newestRecipes(page, setRecipes);
                    break;
                case options[1]:
                    await popularRecipes(page, setRecipes);
                    break;
                case options[2]:
                    await likedRecipes(page, setRecipes);
                    break;
                default:
                    console.log('error');
            }
        }
        reciveData();
    }, [options, page, routeName])
    return (
        <Fragment>
            {recipes.map((recipe, index) => (
                <div key={recipe.recipie_id}>
                    <RecipeCard recipe={{
                        ...recipe,
                        index
                    }} />
                </div>
            ))}
        </Fragment>
    )
}

export default DisplayRecipes;