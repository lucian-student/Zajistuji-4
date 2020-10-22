import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function RecipeForm() {
    const { register, errors, handleSubmit } = useForm();
    return (
        <Fragment>
            <Form>
                <Container>
                    <Row>
                        <Form.Group style={{ width: '100%', display: 'inline-block' }}>
                            <Form.Label>Name</Form.Label>
                            <Button style={{ width: '20%', display: 'inline-block', float: 'right' }} variant='success'>
                                Save
                            </Button>
                            <Form.Control style={{ width: '100%' }} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group style={{ width: '100%' }}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} style={{ width: '100%' }} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group style={{ width: '100%' }}>
                                <Form.Label>Add Image</Form.Label>
                                <Form.File />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </Fragment>
    )
}

export default RecipeForm;