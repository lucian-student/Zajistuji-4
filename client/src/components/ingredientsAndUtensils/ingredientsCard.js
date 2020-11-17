import React, { Fragment, useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { BiMenu } from 'react-icons/bi';
import { deleteInrgedients } from '../../queries/ingredients/deleteIngredients';
import { IngredientsAndUtensilsContext } from '../../context/ingredientsAndUtensils';
import { updateIngredients } from '../../queries/ingredients/updateIngredients';
import IngredinetsEditForm from '../recipePage/ingredientsComponents/ingredientsEditForm';
function IngredientsCard({ ingredients: { user_id, category, name, ingredients_id, index } }) {
    const { setIngredients, ingredients } = useContext(IngredientsAndUtensilsContext);
    const [editing, setEditing] = useState(false);
    async function deleteIngredients() {
        await deleteInrgedients(ingredients_id, setIngredients);
    }
    const handleClose = () => setEditing(false);
    const handleShow = () => setEditing(true);

    async function handleUpdateIngredients(data) {
        await updateIngredients(data.name, data.category, ingredients_id, setIngredients, ingredients, index);
        handleClose();
    }

    const options = ['Edit', 'Delete']
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <Dropdown style={{ display: 'inline' }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <BiMenu />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {options.map((option, index) => (
                                <div key={index}>
                                    {option === 'Delete' ? (
                                        <Button variant=''
                                            style={{ width: '100%' }}
                                            onClick={deleteIngredients}>{option}</Button>
                                    ) : (
                                            <Button variant=''
                                                style={{ width: '100%' }}
                                                onClick={handleShow}>{option}</Button>
                                        )}
                                </div>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div style={{
                        display: 'inline',
                        marginInlineStart: '5%',
                        wordBreak: 'break-all'
                    }}>{name}</div>
                    <div style={{
                        display: 'inline',
                        marginInlineStart: '5%',
                        wordBreak: 'break-all'
                    }}>{category}</div>
                </Card.Body>
            </Card>
            <IngredinetsEditForm properties={{
                editing,
                setEditing,
                name,
                category,
                handleUpdateIngredients
            }} />
        </Fragment>
    )
}

export default IngredientsCard