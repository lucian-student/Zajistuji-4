import React, { useState, Fragment, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BiMenu } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
import IngredientsEditForm from './ingredientsEditForm';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { updateIngredients } from '../../../queries/recipeIngredients/updateIngredients';
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

    async function handleUpdateIngredients(data) {
        await updateIngredients(recipeData.ingredients, setIngredients, index, data.name, data.category, ingredients_id, recipie_id);
        setEditing(false);
    }
    return (
        <Fragment>
            <Card>
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
                            <Dropdown.Item as={Button} variant='light'>
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