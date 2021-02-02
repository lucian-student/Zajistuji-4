import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
/*
Formular na upravu ingredienci kroku
*/
function StepIngredientEditForm({ properties: {
    editing,
    setEditing,
    name,
    category,
    unit,
    value,
    handleUpdateIngredients
} }) {
    const { handleSubmit, register, errors } = useForm();
    return (
        <Fragment>
            <Modal show={editing} onHide={() => setEditing(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Ingredients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleUpdateIngredients)}>
                        <Form.Group controlId="name">
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
                        <Form.Group controlId="category">
                            <Form.Control autoComplete="off"
                                name='category'
                                type='text'
                                placeholder='Category'
                                defaultValue={category}
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
                        <Form.Group controlId="value">
                            <Form.Control autoComplete="off"
                                name='value'
                                type='text'
                                placeholder='Value'
                                defaultValue={value}
                                ref={register} />
                        </Form.Group>
                        <Form.Group controlId="unit">
                            <Form.Control autoComplete="off"
                                name='unit'
                                type='text'
                                placeholder='Unit'
                                defaultValue={unit}
                                ref={register} />
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

export default StepIngredientEditForm;