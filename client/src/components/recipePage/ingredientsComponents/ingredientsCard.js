import React, { useState, Fragment, useContext, useRef, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BiMenu } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
import IngredientsEditForm from './ingredientsEditForm';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { DimensionsContext } from '../../../context/dimensions';
import { updateIngredients } from '../../../queries/recipeIngredients/updateIngredients';
import { deleteInrgedients } from '../../../queries/recipeIngredients/deleteIngredients';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
function IngredientsCard({ ingredients }) {
    const {
        name,
        category,
        index,
        ingredients_id
    } = ingredients;
    const recipeData = useContext(YourRecipeContext);
    const { recipe: { recipie_id }, setIngredients } = recipeData;
    const [editing, setEditing] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, heigth: 0 });
    const { height, width } = useContext(DimensionsContext);
    const ref = useRef(null);
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
    async function handleUpdateIngredients(data) {
        await updateIngredients(recipeData.ingredients, setIngredients, index, data.name, data.category, ingredients_id, recipie_id);
        setEditing(false);
    }
    async function handleDeleteIngredients() {
        await deleteInrgedients(ingredients_id, setIngredients, recipie_id);
    }
    return (
        <Fragment>
           <Card ref={ref}>
                <Card.Body>
                    <div style={{ display: 'inline-block' }}>
                        <div>
                            {name}
                        </div>
                        <div>
                            {category}
                        </div>
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
                                onClick={handleDeleteIngredients}>
                                Delete
                        </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Body>
            </Card>
            <IngredientsEditForm properties={{
                editing,
                setEditing,
                name,
                category, 
                handleUpdateIngredients
            }} />
        </Fragment>
    )
}

export default IngredientsCard;