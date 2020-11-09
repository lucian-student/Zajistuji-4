import React, { Fragment, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { MdTimer } from 'react-icons/md';
import { BiMenu } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import StepIngredientsAndUtensils from './stepIngredientsAndUtensils';
import StepEditForm from '../../recipeFormStep2/stepComponents/stepEditForm';
import { updateStep } from '../../../queries/recipeSteps/updateStep';
import { YourRecipeContext } from '../../../context/yourRecipe';
function StepCard({ step }) {
    const {
        step_id,
        name,
        description,
        duration,
        ingredients,
        utensils,
        index
    } = step;
    const { recipe: { recipie_id }, steps, setSteps } = useContext(YourRecipeContext);
    const [show, setShow] = useState(false);
    const [editing, setEditing] = useState(false);

    async function handleUpdateStep(data) {
        await updateStep(
            step_id,
            data.duration,
            data.name,
            data.description,
            index,
            recipie_id,
            setSteps,
            steps
        );
        setEditing(false);
    }
    return (
        <Fragment>
            <Card style={{ width: '100%' }}>
                <Card.Header>
                    <div style={{ display: 'inline' }}>
                        {name}
                    </div>
                    <Dropdown style={{ display: 'inline', float: 'right' }}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            <BiMenu />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Button} variant='light'
                                onClick={() => { setEditing(true) }}>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item as={Button} variant='light'>
                                Delete
                            </Dropdown.Item>
                            <Dropdown.Item as={Button} variant='light'
                                onClick={() => { setShow(prevValue => !prevValue) }}>
                                Ingredients and Utensils
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        {duration}
                        <MdTimer />
                    </Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    {show && (
                        <StepIngredientsAndUtensils properties={{ ingredients, utensils }} />
                    )}
                </Card.Body>
            </Card>
            <StepEditForm properties={{
                editing,
                setEditing,
                name,
                duration,
                description,
                handleUpdateStep
            }} />
        </Fragment>
    )
}

export default StepCard;