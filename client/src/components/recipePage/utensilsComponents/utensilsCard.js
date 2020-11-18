import React, { Fragment, useState, useContext, useRef, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BiMenu } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
import UtensilEditForm from './utensilEditForm';
import { updateUtensil } from '../../../queries/recipeUtensils/updateUtensil';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { deleteUtensil } from '../../../queries/recipeUtensils/deleteUtensil';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DimensionsContext } from '../../../context/dimensions';
import axios from 'axios';
function UtensilCard({ utensil }) {
    const source = useRef(axios.CancelToken.source());
    const {
        name,
        index,
        utensils_id
    } = utensil;
    const { recipe: { recipie_id }, utensils, setUtensils } = useContext(YourRecipeContext);
    const [editing, setEditing] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const { width, height } = useContext(DimensionsContext);
    const ref = useRef(null);
    const [, drag, preview] = useDrag({
        item: {
            ...utensil,
            type: 'UTENSILS',
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
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel('canceled');
        }
    }, [preview, height, width]);
    drag(ref);
    async function handleUpdateUtensils(data) {
        await updateUtensil(utensils, setUtensils, index, data.name, utensils_id, recipie_id, setEditing, source.current);
        setEditing(false);
    }
    async function handleDeleteUtensil() {
        await deleteUtensil(utensils_id, setUtensils, recipie_id, source.current);
    }
    return (
        <Fragment>
            <Card ref={ref}>
                <Card.Body>
                    <div style={{ display: 'inline-block' }}>
                        {name}
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
                                onClick={handleDeleteUtensil}>
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

export default UtensilCard;