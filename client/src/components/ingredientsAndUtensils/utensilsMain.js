import React, { Fragment } from 'react';
import UtensilsDisplay from './utensilsDisplay';
import UtensilsForm from './utensilsForm';
/*
zobrazi formular na nacini
a zobrazi zobrazeni karet nacini
*/
function UtensilsMain() {
    return (
        <Fragment>
            <UtensilsForm />
            <UtensilsDisplay />
        </Fragment>
    )
}

export default UtensilsMain;