import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { YourRecipeContext } from '../../context/yourRecipe';
import { AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
function RecipeDataDisplay() {
    const { recipe } = useContext(YourRecipeContext);
    const {
        name,
        category,
        imageurl,
        description,
        num_of_comments,
        num_of_likes
    } = recipe;
    return (
        <Card style={{ width: '100%' }}>
            <Card.Header>
                <Container>
                    <Row>
                        <Col>
                            <Card.Title>
                                {name}
                            </Card.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                {category}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ display: 'flex' }}>
                            <div style={{ margin: 'auto' }}>
                                <Card.Text >
                                    <AiOutlineLike />{num_of_likes}
                                </Card.Text>
                            </div>
                        </Col>
                        <Col style={{ display: 'flex' }}>
                            <div style={{ margin: 'auto' }}>
                                <Card.Text>
                                    <BiCommentDetail />{num_of_comments}
                                </Card.Text>
                            </div>
                        </Col>
                    </Row>
                </Container>
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