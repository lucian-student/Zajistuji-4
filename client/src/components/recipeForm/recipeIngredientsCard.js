import React, { Fragment, useRef, useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { RecipeFormContext } from '../../context/recipeForm';
function RecipeIngredientsCard({ ingredients }) {
    const { name, category, index } = ingredients;
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const { height, width } = useContext(RecipeFormContext);
    const ref = useRef();

    const [, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop(item, monitor) {
            return true;
        },
        hover(item, monitor) {
            if (!monitor.canDrop()) {
                return;
            }
            if (!ref.current) {
                return;
            }
            const dragIndex = item.status === 'recipe' ? item.index : 0;
            const hoverIndex = index;
            if (dragIndex === hoverIndex && item.status === 'recipe') {
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
            //logic here
        }
    });

    const [, drag, preview] = useDrag({
        item: { ...ingredients, type: 'INGREDIENTS', dimensions },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
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

    drag(drop(ref));
    return (
        <Fragment>
            <Card ref={ref}>
                <Card.Body>
                    <div>{name}</div>
                    <div>{category}</div>
                </Card.Body>
            </Card>
        </Fragment >
    )
}

export default RecipeIngredientsCard;