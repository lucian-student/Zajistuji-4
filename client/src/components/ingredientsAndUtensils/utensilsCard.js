import React, { Fragment, useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { BiMenu } from 'react-icons/bi';
import { IngredientsAndUtensilsContext } from '../../context/ingredientsAndUtensils';
import { deleteUtensil } from '../../queries/utensils/deleteUtensil';
import { updateUtensil } from '../../queries/utensils/updateUtensil';
import UtensilEditForm from '../recipePage/utensilsComponents/utensilEditForm';
function UtensilsCard({ utensil: { utensils_id, name, index } }) {
    const { setUtensils, utensils, source } = useContext(IngredientsAndUtensilsContext);
    const [editing, setEditing] = useState(false);

    async function handleDeleteUtensil() {
        await deleteUtensil(utensils_id, setUtensils, source);
    }

    async function handleUpdateUtensils(data) {
        await updateUtensil(data.name, utensils_id, setUtensils, utensils, index, source, setEditing);
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
                                            onClick={handleDeleteUtensil}>{option}</Button>
                                    ) : (
                                            <Button variant=''
                                                style={{ width: '100%' }}
                                                onClick={() => setEditing(true)}>{option}</Button>
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

export default UtensilsCard;