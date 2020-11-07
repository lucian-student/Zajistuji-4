import React, { Fragment, useState, useContext } from 'react';
import IngredientsForm from '../../reusableComponents/ingredientsForm';
import { YourRecipeContext } from '../../../context/yourRecipe';
import {createIngredients} from '../../../queries/recipeIngredients/createIngredients';
function RecipeIngredientsForm() {
    const [editing, setEditing] = useState(false);
    const { recipe: { recipie_id }, setIngredients } = useContext(YourRecipeContext);
    async function handleCreateIngredients(data) {
        await createIngredients(data.name, data.category, setIngredients, recipie_id);
        setEditing(false);
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