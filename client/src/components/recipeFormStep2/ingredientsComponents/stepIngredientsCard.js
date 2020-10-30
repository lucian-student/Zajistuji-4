import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CgRemove } from 'react-icons/cg';
import update from 'immutability-helper';
import { useDrag, useDrop } from 'react-dnd'
import { RecipeFormContext } from '../../../context/recipeForm';
import { getEmptyImage } from 'react-dnd-html5-backend';
function StepIngredientsCard({ ingredients }) {
    const {
        name,
        category,
        index,
        step_id,
        checkCanDrop,
        moveItem1,
        ultraOriginalStepIndex
    } = ingredients;
    const { height, width, recipeSteps, setRecipeSteps } = useContext(RecipeFormContext);
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const ref = useRef();
    function RemoveIngredients() {
        setRecipeSteps(update(recipeSteps, {
            [ultraOriginalStepIndex]: {
                ingredients: {
                    $splice: [
                        [index, 1]
                    ]
                }
            }
        }))
    }
    const [, drop] = useDrop({
        accept: 'INGREDIENTS',
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
            ...ingredients,
            type: 'INGREDIENTS',
            status: 'step',
            dimensions,
            originalIndex: index,
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
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeigth
            });
        }
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview, height, width]);
    drop(drag(ref))
    return (
        <Fragment>
            <Card ref={ref} style={{ opacity: (isDragging) ? 0 : 1 }}>
                <Card.Body>
                    <div style={{ display: 'inline-block' }}>
                        <div>{name}</div>
                        <div>{category}</div>
                    </div>
                    <div style={{ float: 'right', display: 'inline-block' }}>
                        <Button variant='dark'
                            onClick={RemoveIngredients}>
                            <CgRemove />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default StepIngredientsCard;