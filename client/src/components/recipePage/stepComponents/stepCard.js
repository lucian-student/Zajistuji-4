import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import { MdTimer } from 'react-icons/md';
import { BiMenu } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
function StepCard({ step }) {
    const {
        name,
        description,
        duration
    } = step;
    return (
        <Fragment>
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
                            <Dropdown.Item as={Button} variant='light'>Edit</Dropdown.Item>
                            <Dropdown.Item as={Button} variant='light'>Delete</Dropdown.Item>
                            <Dropdown.Item as={Button} variant='light'>Ingredients and Utensils</Dropdown.Item>
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
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default StepCard;