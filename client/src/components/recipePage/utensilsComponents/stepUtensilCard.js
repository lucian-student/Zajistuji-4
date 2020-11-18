import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { BiMenu } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DimensionsContext } from '../../../context/dimensions';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { deleteUtensil } from '../../../queries/stepUtensils/deleteUtensil';
import { updateUtensil } from '../../../queries/stepUtensils/updateUtensil';
import UtensilEditForm from './utensilEditForm';
import axios from 'axios';
function StepUtensilCard({ utensil }) {
    const source = useRef(axios.CancelToken.source());
    const {
        utensils_id,
        name,
        index,
        step_id,
        checkCanDrop,
        moveItem1,
        ultraOriginalStepIndex
    } = utensil;
    const { width, height } = useContext(DimensionsContext);
    const { steps, setSteps, recipe: { recipie_id } } = useContext(YourRecipeContext);
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const [editing, setEditing] = useState(false);
    async function handleDeleteUtensils() {
        await deleteUtensil(utensils_id, index, ultraOriginalStepIndex, setSteps, steps, recipie_id, source.current);
    }
    async function handleUpdateUtensils(data) {
        await updateUtensil(
            utensils_id,
            index,
            ultraOriginalStepIndex,
            data,
            steps,
            setSteps,
            recipie_id,
            source.current,
            setEditing
        );
    }
    const ref = useRef();
    const [, drop] = useDrop({
        accept: 'UTENSILS',
        canDrop(item, monitor) {
            return checkCanDrop(item);
        },
        hover(item, monitor) {
            if (!monitor.canDrop()) {
                return;
            }
            if (item.status === 'recipe') {
                return;
            }
            if (item.ultraOriginalStepIndex !== ultraOriginalStepIndex) {
                return;
            }
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            const sameList = item.status === 'step' && item.step_id === step_id;
            if (dragIndex === hoverIndex && sameList) {
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
            //logic
            moveItem1(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });
    const [{ isDragging }, drag, preview] = useDrag({
        item: {
            ...utensil,
            type: 'UTENSILS',
            status: 'step',
            dimensions,
            originalIndex: index,
            source: source.current
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end(item, monitor) {
            if (!monitor.didDrop()) {
                moveItem1(item.index, item.originalIndex);
            }
        }
    });
    useEffect(() => {
        if (ref.current) {
            setDimensions({
                width: ref.current.clientWidth,
                height: ref.current.clientHeight
            });
        }
        preview(getEmptyImage(), { captureDraggingState: true });
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel('canceled');
        }
    }, [preview, height, width]);
    drop(drag(ref))
    return (
        <Fragment>
            <Card ref={ref} style={{ opacity: (isDragging) ? 0 : 1 }}>
                <Card.Body>
                    <div style={{ display: 'inline-block' }}>
                        <Card.Text className='cardText'>
                            {name}
                        </Card.Text>
                    </div>
                    <Dropdown style={{ display: 'inline-block', float: 'right' }}>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            <BiMenu />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Button} variant='light'
                                onClick={() => setEditing(true)}>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item as={Button} variant='light'
                                onClick={handleDeleteUtensils}>
                                Delete
                        </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Body>
            </Card>
            <UtensilEditForm properties={{
                editing,
                setEditing,
                name,
                handleUpdateUtensils
            }} />
        </Fragment>
    )
}

export default StepUtensilCard;