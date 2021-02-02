import React, { Fragment, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import StepFormComponent from '../../reusableComponents/stepForm';
import FormStepIngredients from '../../recipeFormStep2/ingredientsComponents/formStepIngredients';
import FormStepUtensils from '../../recipeFormStep2/utensilsComponents/formStepUtensils';
import { FiPlusCircle } from 'react-icons/fi';
import { StepFormContext } from '../../../context/stepForm';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { createStep } from '../../../queries/recipeSteps/createStep';
import stepCreateParser from '../../../utils/stepCreateParser';
/*
Zobrazi formular kroku
handleCreateStep vytvori krok
*/
function StepForm() {
    const [show, setShow] = useState(false);
    const { formIngredients, formUtensils } = useContext(StepFormContext);
    const { steps, setSteps, recipe: { recipie_id }, source } = useContext(YourRecipeContext);
    async function handleCreateStep(data) {
        const { ingredients, utensils } = stepCreateParser(formIngredients, formUtensils);
        const step = {
            ...data,
            ingredients,
            utensils
        }
        await createStep(step, setSteps, steps, recipie_id, source);
    }
    return (
        <Fragment>
            <Button variant='light' style={{ width: '100%' }}
                onClick={() => { setShow(prevValue => !prevValue) }}>
                <FiPlusCircle style={{ display: 'inline' }} />
                <p style={{ display: 'inline' }}>Add Step</p>
            </Button>
            {show && (
                <Card>
                    <Container>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <StepFormComponent properties={{
                                        handleCreateStep
                                    }} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormStepIngredients />
                                </Col>
                                <Col>
                                    <FormStepUtensils />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Container>
                </Card>
            )}
        </Fragment>
    )
}

export default StepForm;