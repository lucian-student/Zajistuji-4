import React, { Fragment, useRef, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
function YourIngredientsCard({ ingredients }) {
    const { name, category, index } = ingredients;
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const ref = useRef();
    const [, drop] = useDrop({
        accept: 'INGREDIENTS',
        canDrop(item, monitor) {
            return true;
        },
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
            return;
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
                height: ref.current.offsetHeight
            });
        }
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

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

export default YourIngredientsCard;