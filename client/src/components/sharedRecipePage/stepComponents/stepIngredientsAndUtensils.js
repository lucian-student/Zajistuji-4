import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StepIngredients from '../ingredientsComponents/stepIngredients';
import StepUtensils from '../utensilsComponents/stepUtensils';
/*
Zobrazi ingredience a nacini kroku
*/
function StepIngredientsAndUtensils({ properties: { ingredients, utensils } }) {
    return (
        <Container>
            <Row>
                <Col>
                    <StepIngredients properties={{ ingredients }} />
                </Col>
                <Col>
                    <StepUtensils properties={{ utensils }} />
                </Col>
            </Row>
        </Container>
    )
}

export default StepIngredientsAndUtensils;