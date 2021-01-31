import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
/*
zobrazeni nacini pri tahani nacini
*/
function UtensilPreview({ utensil: {
    name,
    dimensions
} }) {
    return (
        <Fragment>
            <Card style={{ width: dimensions.width, height: dimensions.height }}>
                <Card.Body>
                    <div>{name}</div>
                </Card.Body>
            </Card>
        </Fragment >
    )
}

export default UtensilPreview;