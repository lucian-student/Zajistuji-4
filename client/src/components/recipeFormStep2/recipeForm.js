import React, { Fragment, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ValidateTextInput, ValidateUnneceserrySpaceUsage } from '../../utils/validators';
import { useForm } from 'react-hook-form';
//image validation
function RecipeForm() {
    const { register, errors, handleSubmit, watch } = useForm();
    const previewImage = watch('image');
    const [image, setImage] = useState(null);
    function isFileImage(file) {
        if (image) {
            const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            return acceptedImageTypes.includes(file[0].type);
        }
        return true;
    }
    useEffect(() => {
        if (previewImage) {
            if (previewImage[0]) {
                const file = previewImage[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                    setImage([reader.result]);
                }
            } else {
                setImage(null);
            }
        } else {
            setImage(null);
        }
    }, [previewImage]);
    async function saveRecipe(data) {
        console.log(data);
    }
    return (
        <Fragment>
            <Form onSubmit={handleSubmit(saveRecipe)}>
                <Container>
                    <Row>
                        <Form.Group style={{ width: '100%', display: 'inline-block' }}>
                            <Form.Label>Name</Form.Label>
                            <Button type='submit' style={{ width: '20%', display: 'inline-block', float: 'right' }}
                                variant='success'>
                                Save
                            </Button>
                            <Form.Control style={{ width: '100%' }}
                                autoComplete="on"
                                name='name'
                                type="text"
                                placeholder="Name"
                                ref={register({
                                    required: true,
                                    validate: {
                                        positive: value => ValidateTextInput(String(value)),
                                        positive2: value => ValidateUnneceserrySpaceUsage(String(value))
                                    }
                                })} />
                            {errors.name && errors.name.type === "required" && (
                                <Form.Text className="helperText">Name is empty!</Form.Text >
                            )}
                            {errors.name && errors.name.type === "positive" && (
                                <Form.Text className="helperText">Dont use space at start and end!</Form.Text >
                            )}
                            {errors.name && errors.name.type === "positive2" && (
                                <Form.Text className="helperText">Dont use more than one space in row!</Form.Text >
                            )}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group style={{ width: '100%' }}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} style={{ width: '100%' }}
                                    autoComplete="on"
                                    name='description'
                                    type="text"
                                    placeholder="Description"
                                    ref={register({})} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group style={{ width: '100%' }}>
                                <Form.Label>Add Image</Form.Label>
                                <Form.File name='image'
                                    ref={register({
                                        validate: {
                                            isImage: value => isFileImage(value)
                                        }
                                    })} />
                                {errors.image && errors.image.type === "isImage" && (
                                    <Form.Text className="helperText">File isnt image!</Form.Text >
                                )}
                            </Form.Group>
                            <div style={{ width: '100%', height: '100%' }}>
                                {image && (
                                    <img src={image} alt={'previewImage'} className='previewImage' />
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </Fragment>
    )
}

export default RecipeForm;