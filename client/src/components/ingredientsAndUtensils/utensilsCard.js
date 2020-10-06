import React, { Fragment, useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { BiMenu } from 'react-icons/bi';
import { IngredientsAndUtensilsContext } from '../../context/ingredientsAndUtensils';
import { deleteUtensil } from '../../queries/utensils/deleteUtensil';
import { updateUtensil } from '../../queries/utensils/updateUtensil';
function UtensilsCard({ utensil: { utensils_id, name, index } }) {
    const { setUtensils, utensils } = useContext(IngredientsAndUtensilsContext);
    const [editing, setEditing] = useState(false);

    async function handleDeleteUtensil() {
        await deleteUtensil(utensils_id, setUtensils);
    }

    const { handleSubmit, register, errors } = useForm();
    const handleClose = () => setEditing(false);
    const handleShow = () => setEditing(true);

    async function handleUpdateUtensils(data) {
        await updateUtensil(data.name, utensils_id, setUtensils, utensils, index);
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
                                            onClick={handleDeleteUtensil}>{option}</Button>
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
                </Card.Body>
            </Card>
            <Modal show={editing} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Ingredients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleUpdateUtensils)}>
                        <Form.Group controlId="formGroupYear">
                            <Form.Control autoComplete="off"
                                name='name'
                                type='text'
                                placeholder='Name'
                                defaultValue={name}
                                ref={register({
                                    required: true,
                                    maxLength: 255
                                })} />
                            {errors.name && errors.name.type === "required" && (
                                <Form.Text className="helperText">Name is empty!</Form.Text>
                            )}
                            {errors.name && errors.name.type === "maxLength" && (
                                <Form.Text className="helperText">255 chars max!</Form.Text>
                            )}
                        </Form.Group>
                        <Button type='submit' >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default UtensilsCard;