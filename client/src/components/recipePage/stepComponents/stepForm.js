import React, { Fragment, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import StepFormComponent from '../../reusableComponents/stepForm';
import FormStepIngredients from '../ingredientsComponents/formStepIngredients';
import FormStepUtensils from '../utensilsComponents/formStepUtensils';
import { FiPlusCircle } from 'react-icons/fi';
import { StepFormProvider } from '../../../context/stepForm';
function StepForm() {
    const [show, setShow] = useState(false);
    async function handleCreateStep(data) {
        console.log(data);
    }
    return (
        <Fragment>
            <Button variant='light' style={{ width: '100%' }}
                onClick={() => { setShow(prevValue => !prevValue) }}>
                <FiPlusCircle style={{ display: 'inline' }} />
                <p style={{ display: 'inline' }}>Add Step</p>
            </Button>
            {show && (
                <StepFormProvider>
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
                </StepFormProvider>
            )}
        </Fragment>
    )
}

export default StepForm;