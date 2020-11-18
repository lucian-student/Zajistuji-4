import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { YourRecipeContext } from '../../context/yourRecipe';
import { AuthContext } from '../../context/auth'
import { ValidateTextInput, ValidateUnneceserrySpaceUsage, isFileImage } from '../../utils/validators';
import Firebase from '../../config/firebase';
import { updateRecipe } from '../../queries/recipes/updateRecipe';
import { v4 as uuidv4 } from 'uuid';
import { CgRemove } from 'react-icons/cg';
function RecipeDataForm({ properties: { editing, setEditing } }) {
    const { handleSubmit, register, errors, watch } = useForm();
    const { currentUser: { user_id } } = useContext(AuthContext);
    const { recipe, setRecipe, source } = useContext(YourRecipeContext);
    const {
        recipie_id,
        name,
        category,
        description,
        image_reference,
        imageurl
    } = recipe;
    const previewImage = watch('image');
    const [image, setImage] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
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
    async function handleUpdateRecipe(data) {
        const storageRef = Firebase.storage().ref();
        let newImageReference = null;
        let newImageUrl = null;
        const {
            name,
            category,
            description,
            image
        } = data;
        if (!imageurl || removeImage) {
            if (image.length > 0) {
                if (image_reference) {
                    const imgRef = storageRef.child(image_reference);
                    await imgRef.delete().then(async function () {
                        const { img_ref, img_url } = await uploadImage(storageRef, data);
                        newImageReference = img_ref;
                        newImageUrl = img_url;
                    }).catch(async function () {
                        const { img_ref, img_url } = await uploadImage(storageRef, data);
                        newImageReference = img_ref;
                        newImageUrl = img_url;
                    });
                } else {
                    const { img_ref, img_url } = await uploadImage(storageRef, data);
                    newImageReference = img_ref;
                    newImageUrl = img_url;
                }
            } else {
                if (removeImage) {
                    const imgRef = storageRef.child(image_reference);
                    await imgRef.delete().catch(function (error) {
                        console.log(error)
                    });
                } else {
                    newImageReference = image_reference;
                    newImageUrl = imageurl;
                }
            }
        } else {
            newImageReference = image_reference;
            newImageUrl = imageurl;
        }
        const updateData = {
            id: recipie_id,
            name,
            category,
            description,
            imageUrl: newImageUrl,
            image_reference: newImageReference
        };
        await updateRecipe(setRecipe, updateData, setRemoveImage, source);
    }

    async function uploadImage(storageRef, data) {
        let img_ref = null;
        let img_url = null;
        const uuid = uuidv4();
        const fileRef = storageRef.child(user_id + '/' + uuid + '/' + data.image[0].name);
        await fileRef.put(data.image[0]).then(async () => {
            img_ref = user_id + '/' + uuid + '/' + data.image[0].name;
            img_url = await fileRef.getDownloadURL();
        }).catch(function (error) {
            console.log(error);
        });
        return { img_ref, img_url };
    }
    return (
        <Fragment>
            <Modal show={editing} onHide={() => { setEditing(false) }} animation={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create Ingredients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handleUpdateRecipe)}>
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
                                        defaultValue={name}
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
                                        defaultValue={category}
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
                                            defaultValue={description}
                                            ref={register} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    {(!imageurl || removeImage) && (
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
                                    )}
                                    <div style={{ width: '100%', height: '100%' }}>
                                        {(image || (imageurl && !removeImage)) && (
                                            <Fragment>
                                                {(removeImage || image) ? (
                                                    <img src={image} alt={'previewImage'} className='previewImage' />
                                                ) : (
                                                        <Fragment>
                                                            <Button variant='dark' style={{ width: '100%' }}
                                                                onClick={() => { setRemoveImage(true) }}>
                                                                <CgRemove />
                                                            </Button>
                                                            <div style={{ display: 'flex' }}>
                                                                <div style={{ margin: 'auto' }}>
                                                                    <img src={imageurl} alt={'previewImage'} className='previewImage' />
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                    )}
                                            </Fragment>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default RecipeDataForm;
