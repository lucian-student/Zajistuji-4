import React, { Fragment, useRef, useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { RecipeFormContext } from '../../context/recipeForm';
import { CgRemove } from 'react-icons/cg';
import Button from 'react-bootstrap/Button';
import update from 'immutability-helper';
function YourUtensilCard({ utensil }) {
    const {
        name,
        utensils_id,
        index,
        checkCanDrop,
        opacityCheck,
        moveItem1,
        moveItem2
    } = utensil;
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const { height, width, noDrop2, recipeUtensilsData, setRecipeUtensilsData }
        = useContext(RecipeFormContext);
    function RemoveUtensil() {
        setRecipeUtensilsData(update(recipeUtensilsData, {
            recipeUtensils: {
                $splice: [
                    [index, 1],
                    [0, 0]
                ]
            },
            tempUtensils: {
                $splice: [
                    [index, 1],
                    [0, 0]
                ]
            }
        }));
    }
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
            if (item.status === 'recipe') {
                moveItem1(dragIndex, hoverIndex);
                item.index = hoverIndex;
            }
            if (item.status === 'yours') {
                moveItem2(dragIndex, hoverIndex, item);
                item.index = hoverIndex;
                item.status = 'recipe';
            }
        }
    });

    const [{ isDragging }, drag, preview] = useDrag({
        item: { ...utensil, type: 'UTENSILS', status: 'recipe', dimensions },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end(item, monitor) {
            if (!monitor.didDrop()) {
                if (item.status === 'recipe') {
                    noDrop2();
                }
            }
        }
    });
    const checkOpacity = () => {
        if (isDragging || opacityCheck(utensils_id)) {
            return true
        }
        return false;
    }
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
            <Card ref={ref} style={{ opacity: checkOpacity() ? 0 : 1 }}>
                <Card.Body >
                    <div style={{ display: 'inline-block' }}>
                        {name}
                    </div>
                    <div style={{ float: 'right', display: 'inline-block' }}>
                        <Button variant='dark'
                            onClick={RemoveUtensil}>
                            <CgRemove />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default YourUtensilCard;