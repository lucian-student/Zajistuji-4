import React, { useState, useContext } from 'react';
import UtensilFormComponent from '../../reusableComponents/utensilForm';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { createUtensil } from '../../../queries/recipeUtensils/createUtensil';
function RecipeUtensilForm() {
    const [editing, setEditing] = useState(false);
    const { setUtensils, recipe: { recipie_id } } = useContext(YourRecipeContext);
    async function handleCreateUtensil(data) {
        await createUtensil(data.name, setUtensils, recipie_id);
        setEditing(false);
    }
    return (
        <UtensilFormComponent properties={{
            handleCreateUtensil,
            editing,
            setEditing
        }} />
    )
}

export default RecipeUtensilForm;