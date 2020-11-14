import React, { Fragment, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import DisplayRecipes from '../components/sharedRecipes/displayRecipes';
function SharedRecipes() {
    const [route, setRoute] = useState({
        routeName: 'Newest',
        page: 0
    });

    const options = [
        'Newest',
        'Popular',
        'Liked'
    ]
    return (
        <Fragment>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <Container>
                        <Row>
                            <Col>
                                <Button variant='info' style={{ width: '100%', opacity: (route.routeName === options[0]) ? 1 : 0.5 }}
                                    onClick={() => {
                                        setRoute({
                                            routeName: options[0],
                                            page: 0
                                        })
                                    }}>
                                    {options[0]}
                                </Button>
                            </Col>
                            <Col>
                                <Button variant='info' style={{ width: '100%', opacity: (route.routeName === options[1]) ? 1 : 0.5 }}
                                    onClick={() => {
                                        setRoute({
                                            routeName: options[1],
                                            page: 0
                                        })
                                    }}>
                                    {options[1]}
                                </Button>
                            </Col>
                            <Col>
                                <Button variant='info' style={{ width: '100%', opacity: (route.routeName === options[2]) ? 1 : 0.5 }}
                                    onClick={() => {
                                        setRoute({
                                            routeName: options[2],
                                            page: 0
                                        })
                                    }}>
                                    {options[2]}
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DisplayRecipes properties={{ route, setRoute, options }} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default SharedRecipes;