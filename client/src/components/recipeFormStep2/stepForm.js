import React, { useContext } from 'react';
import FormStepIngredients from './ingredientsComponents/formStepIngredients';
import FormStepUtensils from './utensilsComponents/formStepUtensils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { RecipeFormContext } from '../../context/recipeForm';
import { StepFormContext } from '../../context/stepForm';
import update from 'immutability-helper';
import { v4 as uuidv4 } from 'uuid';
import StepFormComponent from '../reusableComponents/stepForm';
function StepForm() {
    const { recipeSteps, setRecipeSteps } = useContext(RecipeFormContext);
    const { formIngredients, formUtensils }
        = useContext(StepFormContext);
    function handleCreateStep(data) {
        const { name, duration, description } = data;
        setRecipeSteps(update(recipeSteps, {
            $push: [{
                step_id: uuidv4(),
                name,
                duration,
                description,
                ingredients: formIngredients,
                utensils: formUtensils
            }]
        }))
    }
    return (
        <Card>
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
        </Card>
    )
}

export default StepForm;