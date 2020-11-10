import React, { Fragment, useRef, useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DimensionsContext } from '../../../context/dimensions';
function RecipeIngredientsCard({ ingredients }) {
    const { name, category } = ingredients;
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const { height, width } = useContext(DimensionsContext);
    const ref = useRef();

    const [, drag, preview] = useDrag({
        item: {
            ...ingredients,
            type: 'INGREDIENTS',
            status: 'recipe',
            dimensions,
            ultraOriginalStepIndex: null
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
    }, [preview, height, width]);

    drag(ref);
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