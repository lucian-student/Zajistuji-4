import React from 'react';
import Card from 'react-bootstrap/Card';
/*
Karta ingredience receptu
*/
function RecipeIngredientsCard({ ingredients }) {
    const {
        name,
        category
    } = ingredients;
    return (
        <Card>
            <Card.Body>
                <div>
                    <div>
                        {name}
                    </div>
                    <div>
                        {category}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default RecipeIngredientsCard;