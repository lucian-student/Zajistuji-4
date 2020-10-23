import React, { Fragment, useContext } from 'react';
import { RecipeFormContext } from '../../context/recipeForm';
import withScrolling from 'react-dnd-scrolling';
import RecipeUtensilsCard from './recipeUtensilsCard';
const ScrollingComponent = withScrolling('div');

function UtensilsDisplay() {
    const { recipeUtensilsData: { recipeUtensils } } = useContext(RecipeFormContext);
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Your Utensils</h3>
            <ScrollingComponent className='column'>
                {recipeUtensils.map((utensil, index) => (
                    <div key={utensil.utensils_id}>
                        <RecipeUtensilsCard utensil={{
                            ...utensil,
                            index
                        }} />
                    </div>
                ))}
            </ScrollingComponent>
        </Fragment>
    )
}

export default UtensilsDisplay;