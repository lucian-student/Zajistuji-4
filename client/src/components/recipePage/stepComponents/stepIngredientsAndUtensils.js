import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StepIngredients from '../ingredientsComponents/stepIngredients';
import StepUtensils from '../utensilsComponents/stepUtensils';
function StepIngredientsAndUtensils({ properties: { ingredients, utensils, step_id, index } }) {
    return (
        <Container>
            <Row>
                <Col>
                    <StepIngredients properties={{ ingredients, step_id, index }} />
                </Col>
                <Col>
                    <StepUtensils properties={{ utensils, step_id, index }} />
                </Col>
            </Row>
        </Container>
    )
}

export default StepIngredientsAndUtensils;