import React, { Fragment, useEffect, useContext } from 'react';
import { getYourRecipe } from '../../queries/recipes/getYourRecipe';
import { YourRecipeContext } from '../../context/yourRecipe';
import RecipeDataDisplay from './recipeDataDisplay';
import StepsDisplay from './stepComponents/stepsDisplay';
import IngredientsAndUtensils from './ingredientsAndUtensils';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function PageWrapper({ recipie_id }) {
    const { recipe, setRecipe } = useContext(YourRecipeContext);
    useEffect(() => {
        getYourRecipe(recipie_id, setRecipe);
    }, [recipie_id, setRecipe])
    return (
        <Fragment>
            {recipe && (
                <Container>
                    <Row>
                        <Col>
                            <RecipeDataDisplay />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <IngredientsAndUtensils />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StepsDisplay />
                        </Col>
                    </Row>
                </Container>
            )}
        </Fragment>
    )
}

export default PageWrapper;