import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FiPlusCircle } from 'react-icons/fi';
import StepForm from './stepForm';
function StepFormComponent() {
    const [show, setShow] = useState();
    return (
        <Fragment>
            <Container>
                <Row>
                    <Button variant='light' style={{ width: '100%' }}
                        onClick={() => { setShow(prevValue => !prevValue) }}>
                        <FiPlusCircle style={{ display: 'inline' }} />
                        <p style={{ display: 'inline' }}>Add Step</p>
                    </Button>
                </Row>
                {show && (
                    <StepForm />
                )}
            </Container>
        </Fragment>
    )
}

export default StepFormComponent;