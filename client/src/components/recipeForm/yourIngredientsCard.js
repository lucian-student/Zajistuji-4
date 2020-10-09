import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
function YourIngredientsCard({ ingredients: { name, ingredients_id, category, index } }) {
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

export default YourIngredientsCard;