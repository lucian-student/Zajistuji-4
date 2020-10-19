import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import YourIngredients from './yourIngredients';
import YourUtensils from './yourUtensils';
import RecipeIngredients from './recipeIngredients';
import RecipeUtensils from './recipeUtensils';
import CustomDragLayer from './customDragLayer';

// problem its width is reduced cuz of styles needs to be full width of page
function FirstStep({ properties: { setStep } }) {
    return (
        <Fragment>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <YourIngredients />
                        </Col>
                        <Col>
                            <YourUtensils />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <RecipeIngredients />
                        </Col>
                        <Col>
                            <RecipeUtensils />
                        </Col>
                    </Row>
                </Container>
                <Button
                    style={{ width: '100%' }}
                    variant='light'
                    onClick={
                        () => { setStep(step => step + 1) }}>
                    Next Step
                </Button>
                <CustomDragLayer />
            </div>
        </Fragment >
    )
}

export default FirstStep;