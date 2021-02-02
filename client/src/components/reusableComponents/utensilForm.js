import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { FiPlusCircle } from 'react-icons/fi';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
/*
formular na nacini
*/
function UtensilForm({ properties: {
    handleCreateUtensil,
    editing,
    setEditing
} }) {
    const { handleSubmit, register, errors } = useForm();
    return (
        <Fragment>
            <Button variant="light" style={{ width: '100%' }}
                onClick={() => setEditing(true)}>
                <FiPlusCircle style={{ display: 'inline' }} />
                <p style={{ display: 'inline' }}>Add Utensils</p>
            </Button>
            <Modal show={editing} onHide={() => setEditing(false)} animation={false}>
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

export default UtensilForm;