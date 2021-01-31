import React, { Fragment } from 'react';
import IngredientsDisplay from './ingredientsDisplay';
import IngredientsForm from './ingredientsForm';
/*
Zobrazi formular na ingredience a zobrazi vase ingredience
*/
function IngredientsMain() {
    return (
        <Fragment>
            <IngredientsForm />
            <IngredientsDisplay />
        </Fragment>
    )
}

export default IngredientsMain;