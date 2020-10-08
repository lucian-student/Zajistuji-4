import React, { Fragment, useState } from 'react';
import FirstStep from '../components/recipeForm/firstStep';
import { RecipeFormProvider } from '../context/recipeForm';
import '../responsiveCss/recipeForm.css';
function RecipeForm() {
    const [step, setStep] = useState(1);
    return (
        <Fragment>
            <RecipeFormProvider>
                <div className='firstCenterDiv'>
                    <div className='secondCenterDiv'>
                        {step === 1 && (
                            <FirstStep />
                        )}
                    </div>
                </div>
            </RecipeFormProvider>
        </Fragment>
    )
}

export default RecipeForm;