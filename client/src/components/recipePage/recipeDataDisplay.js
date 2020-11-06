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
function RecipeDataDisplay() {
    const { recipe } = useContext(YourRecipeContext);
    const {
        name,
        category,
        imageurl,
        description
    } = recipe;
    const [editing, setEditing] = useState(false);
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
                            <Dropdown.Item as={Button} variant='light'>
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

export default RecipeDataDisplay;
