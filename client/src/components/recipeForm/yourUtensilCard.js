import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
function YourUtensilCard({ utensil: { name, utensils_id, index } }) {
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    {name}
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default YourUtensilCard;