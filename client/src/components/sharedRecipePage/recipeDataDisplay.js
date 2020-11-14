import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { YourRecipeContext } from '../../context/yourRecipe';
function RecipeDataDisplay() {
    const { recipe } = useContext(YourRecipeContext);
    const {
        name,
        category,
        imageurl,
        description,
    } = recipe;
    return (
        <Card style={{ width: '100%' }}>
            <Card.Header>
                <div>
                    <Card.Title>
                        {name}
                    </Card.Title>
                    <div>
                        {category}
                    </div>
                </div>
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
    )
}

export default RecipeDataDisplay;