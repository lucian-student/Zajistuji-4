import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
function StepIngredientsCard({ ingredients }) {
    const {
        name,
        category
    } = ingredients;
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <div>{name}</div>
                    <div>{category}</div>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default StepIngredientsCard;