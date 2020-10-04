import React, { Fragment } from 'react';
import IngredientsDisplay from './ingredientsDisplay';
import IngredientsForm from './ingredientsForm';
function IngredientsMain() {
    return (
        <Fragment>
            <IngredientsForm />
            <IngredientsDisplay />
        </Fragment>
    )
}

export default IngredientsMain;