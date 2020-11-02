import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { IoMdOpen } from 'react-icons/io';
import { Link } from 'react-router-dom';
function RecipeCard({ recipe }) {
    const {
        recipie_id,
        name,
        category,
        imageurl,
        image_reference
    } = recipe;
    return (
        <Fragment>
            <Card>
                <Card.Header>
                    <div style={{ display: 'inline-block' }}>
                        {category}
                    </div>
                    <div style={{ display: 'inline-block', float: 'right' }}>
                        <Button variant='light' as={Link} to={`/RecipePage/${recipie_id}`}>
                            <IoMdOpen />
                        </Button>
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