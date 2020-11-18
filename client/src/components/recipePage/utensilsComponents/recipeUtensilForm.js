import React, { useState, useContext, useRef, useEffect } from 'react';
import UtensilFormComponent from '../../reusableComponents/utensilForm';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { createUtensil } from '../../../queries/recipeUtensils/createUtensil';
import axios from 'axios';
function RecipeUtensilForm() {
    const source = useRef(axios.CancelToken.source());
    const [editing, setEditing] = useState(false);
    const { setUtensils, recipe: { recipie_id } } = useContext(YourRecipeContext);
    async function handleCreateUtensil(data) {
        await createUtensil(data.name, setUtensils, recipie_id, source.current);
        setEditing(false);
    }
    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel('canceled');
        }
    }, []);
    return (
        <UtensilFormComponent properties={{
            handleCreateUtensil,
            editing,
            setEditing
        }} />
    )
}

export default RecipeUtensilForm;