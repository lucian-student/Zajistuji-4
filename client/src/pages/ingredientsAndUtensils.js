import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UtensilsMain from '../components/ingredientsAndUtensils/utensilsMain';
import IngredientsMain from '../components/ingredientsAndUtensils/IngredientsMain';

function IngredientsAndUtensils() {
    return (
        <Fragment>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <Container>
                        <Row>
                            <Col>
                                <IngredientsMain />
                            </Col>
                            <Col>
                                <UtensilsMain />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default IngredientsAndUtensils;