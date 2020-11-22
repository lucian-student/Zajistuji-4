import React, { Fragment, useEffect, useContext } from 'react';
import { getYourRecipe } from '../../queries/recipes/getYourRecipe';
import { YourRecipeContext } from '../../context/yourRecipe';
import RecipeDataDisplay from './recipeDataDisplay';
import StepsDisplay from './stepComponents/stepsDisplay';
import StepForm from './stepComponents/stepForm';
import IngredientsAndUtensils from './ingredientsAndUtensils';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomDragLayer from '../recipeForm/customDragLayer';
import { StepFormProvider } from '../../context/stepForm';
function PageWrapper({ recipie_id }) {
    const { recipe, setRecipe, source } = useContext(YourRecipeContext);
    useEffect(() => {
        const reciveData = async () => {
            await getYourRecipe(recipie_id, setRecipe, source);
        }
        reciveData();
    }, [recipie_id, setRecipe, source]);
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
                            <StepFormProvider>
                                <StepForm />
                            </StepFormProvider>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StepsDisplay />
                        </Col>
                    </Row>
                    <CustomDragLayer />
                </Container>
            )}
        </Fragment>
    )
}

export default PageWrapper;