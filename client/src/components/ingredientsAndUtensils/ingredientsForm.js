import React, { Fragment, useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IngredientsAndUtensilsContext } from '../../context/ingredientsAndUtensils';
import { createIngredients } from '../../queries/ingredientsAndUtensils/createIngredients';
import { useForm } from 'react-hook-form';
import { FiPlusCircle } from 'react-icons/fi';
function IngredientsForm() {
    const [editing, setEditing] = useState(false);
    const { handleSubmit, register, errors } = useForm();
    const { setIngredients } = useContext(IngredientsAndUtensilsContext);
    const handleClose = () => setEditing(false);
    const handleShow = () => setEditing(true);

    async function newIngredients(data) {
        await createIngredients(data.name, data.category, setIngredients);
    }
    return (
        <Fragment>
            <Button variant="light" style={{ width: '100%' }}
                onClick={handleShow}>
                <FiPlusCircle style={{ display: 'inline' }} />
                <p style={{ display: 'inline' }}>Add Ingredients</p>
            </Button>
            <Modal show={editing} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Ingredients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(newIngredients)}>
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