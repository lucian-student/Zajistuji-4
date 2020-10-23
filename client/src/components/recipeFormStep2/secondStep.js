import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import RecipeForm from './recipeForm';
import StepComponent from './stepComponent';
import CustomDragLayer from '../recipeForm/customDragLayer';
function SecondStep({ properties: { setStep } }) {
    return (
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <RecipeForm />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <StepComponent />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant='light' style={{ width: '100%' }}
                            onClick={() => { setStep(step => step - 1) }}>
                            Previous Step
                        </Button>
                    </Col>
                </Row>
            </Container>
            <CustomDragLayer />
        </Fragment>
    )
}

export default SecondStep;