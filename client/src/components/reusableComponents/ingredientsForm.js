import React, { Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { FiPlusCircle } from 'react-icons/fi';
/*
formular na ingredience
*/
function IngredientsForm({ properties: {
    handleCreateIngredients,
    editing,
    setEditing
} }) {
    const { handleSubmit, register, errors } = useForm();
    return (
        <Fragment>
            <Button variant="light" style={{ width: '100%' }}
                onClick={() => setEditing(true)}>
                <FiPlusCircle style={{ display: 'inline' }} />
                <p style={{ display: 'inline' }}>Add Ingredients</p>
            </Button>
            <Modal show={editing} onHide={() => setEditing(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Ingredients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleCreateIngredients)}>
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
                            <Form.Control autoComplete="off"
                                name='category'
                                type='text'
                                placeholder='Category'
                                ref={register({
                                    required: true,
                                    maxLength: 255
                                })} />
                            {errors.category && errors.category.type === "required" && (
                                <Form.Text className="helperText">Category is empty!</Form.Text>
                            )}
                            {errors.category && errors.category.type === "maxLength" && (
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

export default IngredientsForm;