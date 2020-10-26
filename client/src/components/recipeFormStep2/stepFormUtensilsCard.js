import React, { Fragment, useRef, useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { RecipeFormContext } from '../../context/recipeForm';
import { CgRemove } from 'react-icons/cg';
import Button from 'react-bootstrap/Button';
import update from 'immutability-helper';
import { StepFormContext } from '../../context/stepForm';

function StepFormUtensilsCard({ utensil }) {
    const {
        name,
        utensils_id,
        index,
        checkCanDrop,
        opacityCheck,
        moveItem1,
        moveItem2,
        noDrop2
    } = utensil;
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const { height, width } = useContext(RecipeFormContext);
    const { formUtensilsData, setFormUtensilsData } = useContext(StepFormContext);
    function RemoveUtensil() {
        setFormUtensilsData(update(formUtensilsData, {
            tempUtensils: {
                $splice: [
                    [index, 1],
                    [0, 0]
                ]
            },
            formUtensils: {
                $splice: [
                    [index, 1],
                    [0, 0]
                ]
            },
        }));
    }
    const ref = useRef();
    const [, drop] = useDrop({
        accept: 'UTENSILS',
        canDrop(item, monitor) {
            //check Can drop 
            return checkCanDrop(item);
        },
        hover(item, monitor) {
            if (!monitor.canDrop()) {
                return;
            }
            if (!ref.current) {
                return;
            }
            const dragIndex = item.status === 'form' ? item.index : 0;
            const hoverIndex = index;
            if (dragIndex === hoverIndex && item.status === 'form') {
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
            if (item.status === 'form') {
                moveItem1(dragIndex, hoverIndex);
                item.index = hoverIndex;
            }
            if (item.status === 'recipe') {
                moveItem2(dragIndex, hoverIndex, item);
                item.index = hoverIndex;
                item.status = 'form';
            }
        }
    });
    const [{ isDragging }, drag, preview] = useDrag({
        item: { ...utensil, type: 'UTENSILS', status: 'form', dimensions },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end(item, monitor) {
            if (!monitor.didDrop()) {
                noDrop2()
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
                <Card.Body>
                    <div style={{ display: 'inline-block' }}>
                        <div>{name}</div>
                    </div>
                    <div style={{ float: 'right', display: 'inline-block' }}>
                        <Button variant='dark'
                            onClick={RemoveUtensil}>
                            <CgRemove />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Fragment >
    )
}

export default StepFormUtensilsCard;