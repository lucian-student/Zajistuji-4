import React, { Fragment, useState, useRef, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { MdTimer } from 'react-icons/md';
import { BiMenu } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StepCardInrgedients from '../ingredientsComponents/stepCardIngredients';
import StepCardUtensils from '../utensilsComponents/stepCardUtensils';
import { useDrop, useDrag } from 'react-dnd';
import { RecipeFormContext } from '../../../context/recipeForm';
import { getEmptyImage } from 'react-dnd-html5-backend';
function StepCard({ step }) {
    const {
        step_id,
        index,
        moveItem1,
        removeItem,
        name,
        duration,
        description,
        ingredients,
        tempIngredients,
        utensils,
        tempUtensils
    } = step;
    const [show, setShow] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const { height, width, startedDragging, setStartedDragging } = useContext(RecipeFormContext);
    const ref = useRef();
    const [, drop] = useDrop({
        accept: 'STEP',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            moveItem1(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });
    const [{ isDragging }, drag, preview] = useDrag({
        item: { ...step, type: 'STEP', dimensions, originalIndex: index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end(item, monitor) {
            setStartedDragging(false);
            if (!monitor.didDrop()) {
                moveItem1(item.index, item.originalIndex)
            }
        },
        begin(item, monitor) {
            setStartedDragging(true);
        }
    });

    useEffect(() => {
        if (ref.current) {
            setDimensions({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeigth
            });
        }
        if (startedDragging) {
            setShow(false);
        }
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview, height, width, startedDragging]);
    drop(ref);
    return (
        <Fragment>
            <Card ref={ref} style={{ opacity: isDragging === true ? 0 : 1 }}>
                <Card.Header ref={drag}>
                    <div style={{ display: 'inline-block' }}>
                        {name}
                    </div>
                    <Dropdown style={{ display: 'inline-block', float: 'right' }}>
                        <Dropdown.Toggle variant='primary'>
                            <BiMenu />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Button}>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item as={Button}
                                onClick={() => { removeItem(index) }}>
                                Delete
                            </Dropdown.Item>
                            <Dropdown.Item as={Button}
                                onClick={() => { setShow(prevValue => !prevValue) }}>
                                {!show ? (
                                    <Fragment>
                                        Show Ingredients And Utensils
                                    </Fragment>
                                ) : (
                                        <Fragment>
                                            Hide Ingredients And Utensils
                                        </Fragment>
                                    )}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        {duration}
                        <MdTimer />
                    </Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    {show && (
                        <Container>
                            <Row>
                                <Col>
                                    <StepCardInrgedients properties={{
                                        ingredients,
                                        tempIngredients,
                                        index,
                                        step_id
                                    }} />
                                </Col>
                                <Col>
                                    <StepCardUtensils properties={{
                                        utensils,
                                        tempUtensils,
                                        index,
                                        step_id
                                    }} />
                                </Col>
                            </Row>
                        </Container>
                    )}
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default StepCard;