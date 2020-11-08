import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecipeIngredientsDisplay from './ingredientsComponents/recipeIngredientsDisplay';
import RecipeUtensilsDisplay from './utensilsComponents/recipeUtensilsDisplay';
import RecipeIngredientsWrapper from './ingredientsComponents/recipeIngredientsWrapper';
import RecipeUtensilsWrapper from './utensilsComponents/recipeUtensilsWrapper';
import RecipeIngredientsForm from './ingredientsComponents/recipeIngredientsForm';
import RecipeUtensilForm from './utensilsComponents/recipeUtensilForm';
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
            <Row>
                <RecipeIngredientsWrapper show={show}>
                    <Col>
                        <Row>
                            <Col>
                                <RecipeIngredientsForm />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <RecipeIngredientsDisplay />
                            </Col>
                        </Row>
                    </Col>
                </RecipeIngredientsWrapper>
                <RecipeUtensilsWrapper show={show}>
                    <Col>
                        <Row>
                            <Col>
                                <RecipeUtensilForm />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <RecipeUtensilsDisplay />
                            </Col>
                        </Row>
                    </Col>
                </RecipeUtensilsWrapper>
            </Row>
        </Container>
    )
}

export default IngredientsAndUtensils;