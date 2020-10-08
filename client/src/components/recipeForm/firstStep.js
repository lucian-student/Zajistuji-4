import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import YourIngredientas from './yourIngredients';
import YourUtensils from './yourUtensils';
import RecipeIngredients from './recipeIngredients';
import RecipeUtensils from './recipeUtensils';
function FirstStep() {
    return (
        <Fragment>
            <DndProvider backend={HTML5Backend}>
                <Container>
                    <Row>
                        <Col>
                            <YourIngredientas />
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
            </DndProvider>
        </Fragment>
    )
}

export default FirstStep;