import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { IoMdOpen } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
function RecipeCard({ recipe }) {
    const {
        recipie_id,
        name,
        category,
        imageurl,
        image_reference,
        num_of_likes,
        num_of_comments,
        username
    } = recipe;
    return (
        <Fragment>
            <Card>
                <Card.Header>
                    <div style={{ display: 'inline-block' }}>
                        {category}
                    </div>
                    <div style={{ display: 'inline-block', float: 'right' }}>
                        <Button variant='light' as={Link} to={`/SharedRecipePage/${recipie_id}`}>
                            <IoMdOpen />
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        <div>
                            {name}
                        </div>
                    </Card.Title>
                    <Card.Title>
                        <div>
                            {username}
                        </div>
                    </Card.Title>
                    {imageurl && (
                        <img alt={image_reference} src={imageurl} className='cardImage' />
                    )}
                </Card.Body>
                <Container>
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
            </Card>
        </Fragment>
    )
}

export default RecipeCard;