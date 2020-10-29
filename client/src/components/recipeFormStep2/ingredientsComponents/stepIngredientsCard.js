import React, { Fragment, useState, useEffect, useContext, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import { useDrag, useDrop } from 'react-dnd'
import { RecipeFormContext } from '../../../context/recipeForm';
import { getEmptyImage } from 'react-dnd-html5-backend';
function StepIngredientsCard({ ingredients }) {
    const {
        name,
        category,
        originalStepIndex,
        index,
        moveItem2,
        step_id,
        moveItem1,
        moveFromRecipe,
        checkCanDrop,
        differentNoDrop
    } = ingredients;
    const { height, width } = useContext(RecipeFormContext);
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const ref = useRef();
    const [, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop(item, monitor) {
            return checkCanDrop(item);
        },
        hover(item, monitor) {
            if (!monitor.canDrop()) {
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
            if (item.status === 'recipe') {
                console.log('recipe');
                moveFromRecipe(item, hoverIndex);
                item.step_id = step_id;
                item.status = 'step';
                item.index = hoverIndex;
                item.originalStepIndex = originalStepIndex;
                return;
            }
            if (sameList) {
                console.log('same step');
                moveItem1(dragIndex, hoverIndex);
                item.index = hoverIndex;
                return;
            }
            if (item.status === 'step' && item.step_id !== step_id) {
                console.log('differnet step');
                moveItem2(hoverIndex, item);
                item.step_id = step_id;
                item.index = hoverIndex;
                item.originalStepIndex = originalStepIndex;
                return;
            }
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
                if (item.ultraOriginalStepIndex === item.originalStepIndex) {
                    moveItem1(item.index, item.originalIndex);
                } else {
                    console.log('different');
                    differentNoDrop(item);
                }
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
            <Card ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
                <Card.Body>
                    <div>{name}</div>
                    <div>{category}</div>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default StepIngredientsCard;