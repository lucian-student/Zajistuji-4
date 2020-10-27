import React, { Fragment, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { MdTimer } from 'react-icons/md';
import { BiMenu } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StepCardInrgedients from './stepCardIngredients';
import StepCardUtensils from './stepCardUtensils';
function StepCard({ step }) {
    const {
        step_id,
        name,
        duration,
        description,
        ingredients,
        utensils
    } = step;
    const [show, setShow] = useState(false);
    return (
        <Fragment>
            <Card>
                <Card.Header>
                    <div style={{ display: 'inline-block' }}>
                        {name}
                    </div>
                    <Dropdown style={{ display: 'inline-block', float: 'right' }}>
                        <Dropdown.Toggle variant='primary'>
                            <BiMenu />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Button}>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item as={Button}>
                                Delete
                            </Dropdown.Item>
                            <Dropdown.Item as={Button}
                                onClick={() => { setShow(prevValue => !prevValue) }}>
                                {!show ? (
                                    <Fragment>
                                        Show Ingredients And Utensils
                                    </Fragment>
                                ) : (
                                        <Fragment>
                                            Hide Ingredients And Utensils
                                        </Fragment>
                                    )}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        {duration}
                        <MdTimer />
                    </Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    {show && (
                        <Container>
                            <Row>
                                <Col>
                                    <StepCardInrgedients />
                                </Col>
                                <Col>
                                    <StepCardUtensils />
                                </Col>
                            </Row>
                        </Container>
                    )}
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default StepCard;