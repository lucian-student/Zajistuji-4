import React, { Fragment, useState, useContext, useRef, useEffect } from 'react';
import IngredientsForm from '../../reusableComponents/ingredientsForm';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { createIngredients } from '../../../queries/recipeIngredients/createIngredients';
import axios from 'axios';
/*
Zobrazi Formular na ingredience receptu
handleCreateIngredients vytvori ingredienci
*/
function RecipeIngredientsForm() {
    const source = useRef(axios.CancelToken.source());
    const [editing, setEditing] = useState(false);
    const { recipe: { recipie_id }, setIngredients } = useContext(YourRecipeContext);
    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel('canceled');
        }
    }, []);
    async function handleCreateIngredients(data) {
        await createIngredients(data.name, data.category, setIngredients, recipie_id, setEditing, source.current);
    }
    return (
        <Fragment>
            <IngredientsForm properties={{
                handleCreateIngredients,
                editing,
                setEditing
            }} />
        </Fragment>
    )
}

export default RecipeIngredientsForm;