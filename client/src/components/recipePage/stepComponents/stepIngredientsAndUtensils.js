import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StepIngredients from '../ingredientsComponents/stepIngredients';
import StepUtensils from '../utensilsComponents/stepUtensils';
function StepIngredientsAndUtensils({ properties: { ingredients, utensils } }) {
    return (
        <Container>
            <Row>
                <Col>
                    <StepIngredients ingredients={ingredients} />
                </Col>
                <Col>
                    <StepUtensils utensils={utensils} />
                </Col>
            </Row>
        </Container>
    )
}

export default StepIngredientsAndUtensils;