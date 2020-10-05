import React, { Fragment, useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { BiMenu } from 'react-icons/bi';
import { deleteInrgedients } from '../../queries/ingredientsAndUtensils/deleteIngredients';
import { IngredientsAndUtensilsContext } from '../../context/ingredientsAndUtensils';
import { updateIngredients } from '../../queries/ingredientsAndUtensils/updateIngredients';
function IngredientsCard({ ingredients: { user_id, category, name, ingredients_id, index } }) {
    const { setIngredients, ingredients } = useContext(IngredientsAndUtensilsContext);
    const [editing, setEditing] = useState(false);
    async function deleteIngredients() {
        await deleteInrgedients(ingredients_id, setIngredients);
    }

    const { handleSubmit, register, errors } = useForm();
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
            <Modal show={editing} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Ingredients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleUpdateIngredients)}>
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
                        <Button type='submit' >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default IngredientsCard