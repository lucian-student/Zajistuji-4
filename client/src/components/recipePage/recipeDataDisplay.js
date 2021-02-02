import React, { Fragment, useContext, useState } from 'react';
import { YourRecipeContext } from '../../context/yourRecipe';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BiMenu } from 'react-icons/bi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import RecipeDataForm from './recipeDataForm';
import { withRouter, Redirect } from 'react-router-dom';
import { deleteRecipe } from '../../queries/recipes/deleteRecipe';
import { shareUnshareRecipe } from '../../queries/recipes/shareUnshareRecipe';
/*
zobrazi zakladni data receptu
handleDeleteRecipe smaze recept
handůeShareUnshareRecipe sdili recept a pokud je sdileny tak ho prestane sdilet
*/
function RecipeDataDisplay() {
    const { recipe, setRecipe, source } = useContext(YourRecipeContext);
    const [deleted, setDeleted] = useState(false);
    const {
        recipie_id,
        name,
        category,
        imageurl,
        image_reference,
        description,
        shared
    } = recipe;
    const [editing, setEditing] = useState(false);
    async function handleDeleteRecipe() {
        await deleteRecipe(recipie_id, setDeleted, source, image_reference);
    }
    async function handleShareUnshareRecipe() {
        await shareUnshareRecipe(setRecipe, shared, recipie_id, source);
    }
    if (deleted) {
        return (
            <Redirect to='/main' />
        );
    }
    return (
        <Fragment>
            <Card style={{ width: '100%' }}>
                <Card.Header>
                    <div style={{ display: 'inline-block' }}>
                        <Card.Title>
                            {name}
                        </Card.Title>
                        <div>
                            {category}
                        </div>
                    </div>
                    <Dropdown style={{ display: 'inline', float: 'right' }}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            <BiMenu />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Button} variant='light'
                                onClick={() => { setEditing(true) }}>Edit
                            </Dropdown.Item>
                            <Dropdown.Item as={Button} variant='light'
                                onClick={handleShareUnshareRecipe}>
                                {shared ? (
                                    <Fragment>unshare</Fragment>
                                ) : (
                                        <Fragment>share</Fragment>
                                    )}
                            </Dropdown.Item>
                            <Dropdown.Item as={Button} variant='light'
                                onClick={handleDeleteRecipe}>
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Card.Text className='textView'>
                                    {description}
                                </Card.Text>
                            </Col>
                            <Col>
                                <div style={{ width: '100%', height: '100%' }}>
                                    {imageurl && (
                                        <img src={imageurl} alt={'previewImage'} className='previewImage' />
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            {editing && (
                <RecipeDataForm properties={{ editing, setEditing }} />
            )}
        </Fragment>
    )
}

export default withRouter(RecipeDataDisplay);
