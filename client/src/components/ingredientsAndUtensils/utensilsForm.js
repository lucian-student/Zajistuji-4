import React, { Fragment, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FiPlusCircle } from 'react-icons/fi';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IngredientsAndUtensilsContext } from '../../context/ingredientsAndUtensils';
import { createUtensil } from '../../queries/utensils/createUtensils';
function UtensilsForm() {
    const [editing, setEditing] = useState(false);
    const { handleSubmit, register, errors } = useForm();
    const { setUtensils } = useContext(IngredientsAndUtensilsContext);

    const handleClose = () => setEditing(false);
    const handleShow = () => setEditing(true);

    async function handleCreateUtensil(data) {
        await createUtensil(data.name, setUtensils);
    }
    return (
        <Fragment>
            <Button variant="light" style={{ width: '100%' }}
                onClick={handleShow}>
                <FiPlusCircle style={{ display: 'inline' }} />
                <p style={{ display: 'inline' }}>Add Utensils</p>
            </Button>
            <Modal show={editing} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Utensil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleCreateUtensil)}>
                        <Form.Group controlId="formGroupYear">
                            <Form.Control autoComplete="off"
                                name='name'
                                type='text'
                                placeholder='Name'
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

export default UtensilsForm;