import React, { Fragment, useState, useContext, useRef, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { MdTimer } from 'react-icons/md';
import { BiMenu } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import StepIngredientsAndUtensils from './stepIngredientsAndUtensils';
import StepEditForm from '../../recipeFormStep2/stepComponents/stepEditForm';
import { updateStep } from '../../../queries/recipeSteps/updateStep';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { DimensionsContext } from '../../../context/dimensions';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDrop, useDrag } from 'react-dnd';
import { deleteStep } from '../../../queries/recipeSteps/deleteStep';
import axios from 'axios';
/*
Karta kroku receptu
handleUpdateStep upravi krok
handleDeleteStep smaze krok
*/
function StepCard({ step }) {
    const source = useRef(axios.CancelToken.source());
    const {
        step_id,
        name,
        description,
        duration,
        ingredients,
        utensils,
        index,
        moveItem1
    } = step;
    const { recipe: { recipie_id }, steps, setSteps, startedDragging, setStartedDragging } = useContext(YourRecipeContext);
    const [show, setShow] = useState(false);
    const [editing, setEditing] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const { height, width } = useContext(DimensionsContext);
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
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem1(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });
    const [{ isDragging }, drag, preview] = useDrag({
        item: { ...step, type: 'STEP', dimensions, originalIndex: index, source: source.current },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end(item, monitor) {
            setStartedDragging(false);
            if (!monitor.didDrop()) {
                moveItem1(item.index, item.originalIndex);
            }
        },
        begin(item, monitor) {
            setStartedDragging(true);
        }
    });
    useEffect(() => {
        if (ref.current) {
            console.log()
            setDimensions({
                width: ref.current.clientWidth,
                height: ref.current.clientHeight
            });
        }
        if (startedDragging) {
            setShow(false);
        }
        preview(getEmptyImage(), { captureDraggingState: true });
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel('canceled');
        }
    }, [preview, height, width, startedDragging]);
    drop(ref);
    async function handleUpdateStep(data) {
        await updateStep(
            step_id,
            data.duration,
            data.name,
            data.description,
            index,
            recipie_id,
            setSteps,
            steps,
            source.current,
            setEditing
        );
    }
    async function handleDeleteStep() {
        await deleteStep(step_id, setSteps, recipie_id, source.current);
    }
    return (
        <Fragment>
            <Card ref={ref} style={{ width: '100%', opacity: isDragging === true ? 0 : 1 }}>
                <Card.Header ref={drag}>
                    <div style={{ display: 'inline' }}>
                        {name}
                    </div>
                    <Dropdown style={{ display: 'inline', float: 'right' }}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            <BiMenu />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Button} variant='light'
                                onClick={() => { setEditing(true) }}>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item as={Button} variant='light'
                                onClick={handleDeleteStep}>
                                Delete
                            </Dropdown.Item>
                            <Dropdown.Item as={Button} variant='light'
                                onClick={() => { setShow(prevValue => !prevValue) }}>
                                Ingredients and Utensils
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        {duration}
                        <MdTimer />
                    </Card.Title>
                    <Card.Text className='textView'>
                        {description}
                    </Card.Text>
                    {show && (
                        <StepIngredientsAndUtensils properties={{ ingredients, utensils, step_id, index }} />
                    )}
                </Card.Body>
            </Card>
            <StepEditForm properties={{
                editing,
                setEditing,
                name,
                duration,
                description,
                handleUpdateStep
            }} />
        </Fragment>
    )
}

export default StepCard;