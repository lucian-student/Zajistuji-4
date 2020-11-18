import React, { Fragment, useState, useContext } from 'react';
import { IngredientsAndUtensilsContext } from '../../context/ingredientsAndUtensils';
import { createUtensil } from '../../queries/utensils/createUtensils';
import UtensilFormComponent from '../reusableComponents/utensilForm';
function UtensilsForm() {
    const [editing, setEditing] = useState(false);
    const { setUtensils, source } = useContext(IngredientsAndUtensilsContext);
    async function handleCreateUtensil(data) {
        await createUtensil(data.name, setUtensils, source, setEditing);
    }
    return (
        <Fragment>
            <UtensilFormComponent properties={{
                handleCreateUtensil,
                editing,
                setEditing
            }} />
        </Fragment>
    )
}

export default UtensilsForm;