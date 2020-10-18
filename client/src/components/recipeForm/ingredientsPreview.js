import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
function IngredientsPreview({ ingredients: {
    name,
    category,
    dimensions
} }) {
    return (
        <Fragment>
            <Card style={{ width: dimensions.width, height: dimensions.height }}>
                <Card.Body>
                    <div>{name}</div>
                    <div>{category}</div>
                </Card.Body>
            </Card>
        </Fragment >
    )
}

export default IngredientsPreview;