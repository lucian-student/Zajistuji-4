import React, { Fragment, useState, useContext } from 'react';
import { IngredientsAndUtensilsContext } from '../../context/ingredientsAndUtensils';
import { createIngredients } from '../../queries/ingredients/createIngredients';
import IngredientsFormComponent from '../reusableComponents/ingredientsForm';
function IngredientsForm() {
    const [editing, setEditing] = useState(false);
    const { setIngredients } = useContext(IngredientsAndUtensilsContext);

    async function handleCreateIngredients(data) {
        await createIngredients(data.name, data.category, setIngredients);
        setEditing(false);
    }
    return (
        <Fragment>
            <IngredientsFormComponent properties={{
                handleCreateIngredients,
                editing,
                setEditing
            }} />
        </Fragment>
    )
}

export default IngredientsForm;