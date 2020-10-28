import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IngredientsDisplay from './ingredientsComponents/ingredientsDisplay';
import UtensilsDisplay from './utensilsComponents/utensilsDisplay';
function IngredientsAndUtensils() {
    const [show, setShow] = useState(false);
    return (
        <Fragment>
            <Container>
                <Row>
                    <Button variant='light'
                        style={{ width: '100%' }}
                        onClick={() => { setShow(prevValue => !prevValue) }}>
                        {show ? (
                            <Fragment>
                                Hide ingredients and utensils
                            </Fragment>
                        ) : (
                                <Fragment>
                                    Show ingredients and utensils
                                </Fragment>
                            )}
                    </Button>
                </Row>
                {show && (
                    <Row>
                        <Col>
                            <IngredientsDisplay />
                        </Col>
                        <Col>
                            <UtensilsDisplay />
                        </Col>
                    </Row>
                )}
            </Container>
        </Fragment>
    )
}

export default IngredientsAndUtensils;