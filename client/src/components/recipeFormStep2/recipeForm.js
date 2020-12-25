import React, { Fragment, useEffect, useState, useContext, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ValidateTextInput, ValidateUnneceserrySpaceUsage, isFileImage } from '../../utils/validators';
import { useForm } from 'react-hook-form';
import { RecipeFormContext } from '../../context/recipeForm';
import Firebase from '../../config/firebase';
import { createRecipe } from '../../queries/recipes/createRecipe';
import { v4 as uuidv4 } from 'uuid';
import RecipeCreateDataParser from '../../utils/recipeCreateDataParser';
import { AuthContext } from '../../context/auth';
//image validation
function RecipeForm() {
    let btnRef = useRef();
    const { recipeSteps, recipeUtensils, recipeIngredients, source } = useContext(RecipeFormContext);
    const { currentUser: { user_id } } = useContext(AuthContext);
    const { register, errors, handleSubmit, watch } = useForm();
    const previewImage = watch('image');
    const [image, setImage] = useState(null);
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
    /*
     name,
    category,
    description,
    imageUrl,
    imageReference,
    ingredients,
    utensils,
    steps
    */
    async function saveRecipe(data) {
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
        const storageRef = Firebase.storage().ref();
        let imageReference = null;
        let imageUrl = null;
        if (data.image.length > 0) {
            const uuid = uuidv4();
            const fileRef = storageRef.child(user_id + '/' + uuid + '/' + data.image[0].name);
            await fileRef.put(data.image[0]).then(async () => {
                imageReference = user_id + '/' + uuid + '/' + data.image[0].name;
                imageUrl = await fileRef.getDownloadURL();
            });
        }
        const { name, category, description } = data;
        const { ingredients, utensils, steps } = RecipeCreateDataParser(recipeIngredients, recipeUtensils, recipeSteps);
        await createRecipe(name, category, description, imageUrl, imageReference, ingredients, utensils, steps, btnRef, source);
    }
    return (
        <Fragment>
            <Form onSubmit={handleSubmit(saveRecipe)}>
                <Container>
                    <Row>
                        <Form.Group style={{ width: '100%', display: 'inline-block' }}>
                            <Form.Label>Name</Form.Label>
                            <Button type='submit'
                                ref={btnRef}
                                style={{ width: '20%', display: 'inline-block', float: 'right' }}
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
                        <Form.Group style={{ width: '100%' }}>
                            <Form.Label>Category</Form.Label>
                            <Form.Control style={{ width: '100%' }}
                                autoComplete="on"
                                name='category'
                                type="text"
                                placeholder="Category"
                                ref={register({
                                    required: true,
                                    validate: {
                                        positive: value => ValidateTextInput(String(value)),
                                        positive2: value => ValidateUnneceserrySpaceUsage(String(value))
                                    }
                                })} />
                            {errors.category && errors.category.type === "required" && (
                                <Form.Text className="helperText">Name is empty!</Form.Text >
                            )}
                            {errors.category && errors.category.type === "positive" && (
                                <Form.Text className="helperText">Dont use space at start and end!</Form.Text >
                            )}
                            {errors.category && errors.category.type === "positive2" && (
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
                                    ref={register} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group style={{ width: '100%' }}>
                                <Form.Label>Add Image</Form.Label>
                                <Form.File name='image'
                                    ref={register({
                                        validate: {
                                            isImage: value => isFileImage(value, image)
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