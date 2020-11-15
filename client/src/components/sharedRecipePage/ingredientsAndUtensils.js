import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecipeIngredientsDisplay from './ingredientsComponents/recipeIngredientsDisplay';
import RecipeUtensilsDisplay from './utensilsComponents/recipeUtensilsDisplay';
import RecipeIngredientsWrapper from '../recipePage/ingredientsComponents/recipeIngredientsWrapper';
import RecipeUtensilsWrapper from '../recipePage/utensilsComponents/recipeUtensilsWrapper';
function IngredientsAndUtensils() {
    const [show, setShow] = useState(false);
    return (
        <Fragment>
            <Button variant='light' style={{ width: '100%' }}
                onClick={() => { setShow(prevValue => !prevValue) }}>
                Ingredients and Utensils
            </Button>
            {show && (
                <Container>
                    <Row>
                        <Col>
                            <RecipeIngredientsWrapper show={show}>
                                <RecipeIngredientsDisplay />
                            </RecipeIngredientsWrapper>
                        </Col>
                        <Col>
                            <RecipeUtensilsWrapper show={show}>
                                <RecipeUtensilsDisplay />
                            </RecipeUtensilsWrapper>
                        </Col>
                    </Row>
                </Container>
            )}
        </Fragment>
    )
}

export default IngredientsAndUtensils;