import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import update from 'immutability-helper';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RecipeFormContext } from '../../../context/recipeForm';
function StepEditForm({ properties: { editing, setEditing, name, duration, description, index } }) {
    const { register, handleSubmit, errors } = useForm();
    const { recipeSteps, setRecipeSteps } = useContext(RecipeFormContext);
    function handleUpdateStep(data) {
        setRecipeSteps(update(recipeSteps, {
            [index]: {
                $merge: {
                    name: data.name,
                    duration: data.duration,
                    description: data.description
                }

            }
        }));
        setEditing(false);
    }
    return (
        <Modal show={editing} onHide={() => { setEditing(false) }} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Create Ingredients</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleUpdateStep)}>
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
                    <Form.Group>
                        <Form.Control autoComplete='off'
                            name='duration'
                            type='time'
                            placeholder='duration'
                            defaultValue={duration}
                            ref={register({
                                required: true
                            })} />
                        {errors.duration && errors.duration.type === "required" && (
                            <Form.Text className="helperText">Duration is empty!</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" rows={3} style={{ width: '100%' }}
                            autoComplete="on"
                            name='description'
                            type="text"
                            defaultValue={description}
                            placeholder="Description"
                            ref={register({})} />
                    </Form.Group>
                    <Button
                        type='submit'
                        variant='light'
                        style={{ width: '100%' }}>
                        Submit
                </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default StepEditForm;