import React, { Fragment, useEffect, useState } from 'react';
import { newestRecipes } from '../../queries/sharedRecipeQueries/newestRecipes';
import { likedRecipes } from '../../queries/sharedRecipeQueries/likedRecipes';
import { popularRecipes } from '../../queries/sharedRecipeQueries/popularRecipes';
import RecipeCard from './recipeCard';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
function DisplayRecipes({ properties: { route, setRoute, options } }) {
    const { routeName, page } = route;
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const source = axios.CancelToken.source();
        const reciveData = async () => {
            switch (routeName) {
                case options[0]:
                    await newestRecipes(page, setRecipes, source);
                    break;
                case options[1]:
                    await popularRecipes(page, setRecipes, source);
                    break;
                case options[2]:
                    await likedRecipes(page, setRecipes, source);
                    break;
                default:
                    console.log('error');
            }
        }
        reciveData();
        return () => {
            source.cancel('canceled');
        }
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
            {(recipes.length / ((page + 1) * 10)) >= 1 && (
                <Button variant='light' style={{ width: '100%' }}
                    onClick={() => { setRoute(old => { return { ...old, page: old.page + 1 }; }) }}>
                    More...
                </Button>
            )}
        </Fragment>
    )
}

export default DisplayRecipes;