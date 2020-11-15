import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { MdTimer } from 'react-icons/md';
import { BiMenu } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import StepIngredientsAndUtensils from './stepIngredientsAndUtensils';
function StepCard({ step }) {
    const {
        name,
        duration,
        description,
        ingredients,
        utensils,
        step_id,
        index
    } = step;
    const [show, setShow] = useState(false);
    return (
        <Card style={{ width: '100%' }}>
            <Card.Header>
                <div style={{ display: 'inline' }}>
                    {name}
                </div>
                <Dropdown style={{ display: 'inline', float: 'right' }}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        <BiMenu />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Button} variant='light'
                            onClick={() => { setShow(prevValue => !prevValue) }}>
                            Ingredients and Utensils
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
                    <StepIngredientsAndUtensils properties={{ ingredients, utensils, step_id, index }} />
                )}
            </Card.Body>
        </Card>
    )
}

export default StepCard;