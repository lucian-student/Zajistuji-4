import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import { MdTimer } from 'react-icons/md';
function StepPreview({ step: { name, duration, description, dimensions } }) {
    return (
        <Fragment>
            <Card style={{ width: dimensions.width}}>
                <Card.Header>
                    {name}
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

export default StepPreview;