import React, { Fragment, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BiMenu } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
import UtensilEditForm from './utensilEditForm';
import { updateUtensil } from '../../../queries/recipeUtensils/updateUtensil';
import { YourRecipeContext } from '../../../context/yourRecipe';
function UtensilCard({ utensil }) {
    const {
        name,
        index,
        utensils_id
    } = utensil;
    const { recipe: { recipie_id }, utensils, setUtensils } = useContext(YourRecipeContext);
    const [editing, setEditing] = useState(false);
    async function handleUpdateUtensils(data) {
        await updateUtensil(utensils, setUtensils, index, data.name, utensils_id, recipie_id);
        setEditing(false);
    }
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <div style={{ display: 'inline-block' }}>
                        {name}
                    </div>
                    <Dropdown style={{ display: 'inline-block', float: 'right' }}>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            <BiMenu />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Button} variant='light'
                                onClick={() => setEditing(true)}>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item as={Button} variant='light'>
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Body>
            </Card>
            <UtensilEditForm properties={{
                editing,
                setEditing,
                name,
                handleUpdateUtensils
            }} />
        </Fragment>
    )
}

export default UtensilCard;