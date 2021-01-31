import React, { Fragment, useRef, useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DimensionsContext } from '../../context/dimensions';
/*
Karty vaseho nacini v prvnim kroku receptu
*/
function YourUtensilCard({ utensil }) {
    const { name } = utensil;
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const { height, width } = useContext(DimensionsContext);
    const ref = useRef();

    const [, drag, preview] = useDrag({
        item: { ...utensil, type: 'UTENSILS', status: 'yours', dimensions },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    useEffect(() => {
        if (ref.current) {
            setDimensions({
                width: ref.current.clientWidth,
                height: ref.current.clientHeight
            });
        }
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview, height, width]);

    drag(ref);
    return (
        <Fragment>
            <Card ref={ref}>
                <Card.Body>
                    {name}
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default YourUtensilCard;