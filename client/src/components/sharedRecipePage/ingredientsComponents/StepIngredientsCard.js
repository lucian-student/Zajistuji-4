import React from 'react';
import Card from 'react-bootstrap/Card';
function StepIngredientsCard({ ingredients }) {
    const {
        name,
        category,
        value,
        unit
    } = ingredients;
    return (
        <Card>
            <Card.Body>
                <Card.Text className='cardText'>
                    {name}
                </Card.Text>
                <Card.Text className='cardText'>
                    {category}
                </Card.Text>
                <Card.Text className='cardText'>
                    {value} {unit}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default StepIngredientsCard;