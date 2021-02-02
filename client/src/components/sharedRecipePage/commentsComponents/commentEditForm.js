import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
/*
Formular na upravu komentaru
*/
function CommentEditForm({ properties: {
    content,
    handleEditComment,
    setEditing
} }) {
    const [validated, setValidated] = useState(false);
    const { handleSubmit, watch, register } = useForm();
    const contentErrors = watch('content');
    useEffect(() => {
        if (contentErrors) {
            if (contentErrors.length > 255) {
                setValidated(false);
            } else {
                setValidated(true);
            }
        } else {
            setValidated(false);
        }
    }, [contentErrors])
    return (
        <Container >
            <Form style={{ width:'100%' }} onSubmit={handleSubmit(handleEditComment)}>
                <Row style={{ padding: 0 }}>
                    <Col style={{ padding: 0 }}>
                        <Form.Group>
                            <Form.Control
                                style={{ width: '100%', padding: 0 }}
                                autoComplete="off"
                                as="textarea" rows={2}
                                name='content'
                                type='text'
                                placeholder='Comment...'
                                defaultValue={content}
                                ref={register({
                                    required: true,
                                    maxLength: 255
                                })} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ float: 'right' }}>
                            <Button onClick={() => { setEditing(false) }}
                                variant='light'>
                                CANCEL
                            </Button>
                            <Button
                                disabled={!validated}
                                type='submit'
                                variant='success'>
                                COMMENT
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default CommentEditForm;