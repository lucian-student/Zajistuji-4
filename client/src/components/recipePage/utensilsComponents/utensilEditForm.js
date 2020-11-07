import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';

function UtensilEditForm({ properties: {
    editing,
    setEditing,
    name,
    handleUpdateUtensils
} }) {

    const { handleSubmit, register, errors } = useForm();
    return (
        <Modal show={editing} onHide={() => setEditing(false)} animation={false}>
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
    )
}

export default UtensilEditForm;