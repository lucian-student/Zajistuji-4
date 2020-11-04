import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecipeIngredientsDisplay from './ingredientsComponents/recipeIngredientsDisplay';
import RecipeUtensilsDisplay from './utensilsComponents/recipeUtensilsDisplay';

function IngredientsAndUtensils() {
    const [show, setShow] = useState(false);
    return (
        <Container>
            <Row>
                <Col>
                    <Button variant='light' style={{ width: '100%' }}
                        onClick={() => { setShow(prevValue => !prevValue) }}>
                        Ingredients and Utensils
                    </Button>
                </Col>
            </Row>
            {show && (
                <Row>
                    <Col>
                        <RecipeIngredientsDisplay />
                    </Col>
                    <Col>
                        <RecipeUtensilsDisplay />
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default IngredientsAndUtensils;