import React from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { BiMenu } from 'react-icons/bi';
function StepIngredientsCard({ ingredients }) {
    const {
        name,
        category
    } = ingredients;
    return (
        <Card>
            <Card.Body>
                <div style={{ display: 'inline-block' }}>
                    <Card.Text className='cardText'>
                        {name}
                    </Card.Text>
                    <Card.Text className='cardText'>
                        {category}
                    </Card.Text>
                </div>
                <Dropdown style={{ display: 'inline-block', float: 'right' }}>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        <BiMenu />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Button} variant='light'>Edit</Dropdown.Item>
                        <Dropdown.Item as={Button} variant='light'>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Body>
        </Card>
    )
}

export default StepIngredientsCard;