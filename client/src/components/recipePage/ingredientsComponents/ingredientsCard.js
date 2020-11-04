import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BiMenu } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
function IngredientsCard({ ingredients }) {
    const {
        name,
        category
    } = ingredients;
    return (
        <Card>
            <Card.Body>
                <div style={{ display: 'inline-block' }}>
                    <div>
                        {name}
                    </div>
                    <div>
                        {category}
                    </div>
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

export default IngredientsCard;