import React, { Fragment } from 'react';
import UtensilsDisplay from './utensilsDisplay';
import UtensilsForm from './utensilsForm';
function UtensilsMain() {
    return (
        <Fragment>
            <UtensilsForm />
            <UtensilsDisplay />
        </Fragment>
    )
}

export default UtensilsMain;