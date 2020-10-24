import React from 'react';
import FormStepIngredients from './formStepIngredients';
import FormStepUtensils from './formStepUtensils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function StepForm() {
    const { register, handleSubmit, errors } = useForm();

    function createStep(data) {
        console.log(data);
    }
    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit(createStep)}>
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
                            <Form.Group>
                                <Form.Control autoComplete='off'
                                    name='duration'
                                    type='time'
                                    placeholder='duration'
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
                                    placeholder="Description"
                                    ref={register({})} />
                            </Form.Group>
                            <Button type='submit' variant='light' style={{ width: '100%' }}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormStepIngredients />
                    </Col>
                    <Col>
                        <FormStepUtensils />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default StepForm;