import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';

function StepUtensilsCard({ utensil }) {
    const {
        name
    } = utensil;
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <div>
                        {name}
                    </div>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default StepUtensilsCard;