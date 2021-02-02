import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { YourRecipeContext } from '../../context/yourRecipe';
import { AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';
import { like_unlike } from '../../queries/recipeLikes/like_unlike';
/*
Zobrazi data receptu
handle_like_unlike ohodnoti recept
*/
function RecipeDataDisplay() {
    const { recipe, setRecipe, source } = useContext(YourRecipeContext);
    const {
        name,
        category,
        imageurl,
        description,
        num_of_comments,
        num_of_likes,
        recipie_id,
        username
    } = recipe;

    async function handle_like_unlike() {
        await like_unlike(recipe, setRecipe, recipie_id, source);
    }
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
                            <Card.Title>
                                {username}
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
                                    <Button variant='light'
                                        onClick={handle_like_unlike}>
                                        <AiOutlineLike />{num_of_likes}
                                    </Button>
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