import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import { BiMenu } from 'react-icons/bi';
import { IoMdOpen } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
/*
Zobrazi kartu vaseho receptu na strance s vasimi recepty
*/
function RecipeCard({ recipe }) {
    const {
        recipie_id,
        name,
        category,
        imageurl,
        image_reference,
        shared
    } = recipe;
    return (
        <Fragment>
            <Card>
                <Card.Header>
                    <div style={{ display: 'inline-block' }}>
                        {category}
                    </div>
                    <div style={{ display: 'inline-block', float: 'right' }}>
                        <Dropdown style={{ display: 'inline' }}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <BiMenu />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/RecipePage/${recipie_id}`}>
                                    <IoMdOpen />Private
                                </Dropdown.Item>
                                {shared && (
                                    <Dropdown.Item as={Link} to={`/SharedRecipePage/${recipie_id}`}>
                                        <IoMdOpen />Shared
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        <div>
                            {name}
                        </div>
                    </Card.Title>
                    {imageurl && (
                        <img alt={image_reference} src={imageurl} className='cardImage' />
                    )}
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default RecipeCard;