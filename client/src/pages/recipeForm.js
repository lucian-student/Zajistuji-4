import React, { Fragment, useState } from 'react';
import FirstStep from '../components/recipeForm/firstStep';
import { RecipeFormProvider } from '../context/recipeForm';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../responsiveCss/recipeForm.css';
function RecipeForm() {
    const [step, setStep] = useState(1);
    return (
        <Fragment>
            <RecipeFormProvider>
                <div className='firstCenterDiv'>
                    <div className='secondCenterDiv'>
                        {step === 1 && (
                            <DndProvider backend={HTML5Backend}>
                                <FirstStep properties={{ setStep }} />
                            </DndProvider>
                        )}
                    </div>
                </div>
            </RecipeFormProvider>
        </Fragment>
    )
}

export default RecipeForm;