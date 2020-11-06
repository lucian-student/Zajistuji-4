import React from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { BiMenu } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';
function StepUtensilCard({ utensil }) {
    const {
        name
    } = utensil;
    return (
        <Card>
            <Card.Body>
                <div>
                    <Card.Text className='cardText'>
                        {name}
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

export default StepUtensilCard;