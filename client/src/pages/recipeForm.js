import React, { Fragment, useState } from 'react';
import FirstStep from '../components/recipeForm/firstStep';
import SecondStep from '../components/recipeFormStep2/secondStep';
import { RecipeFormProvider } from '../context/recipeForm';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../responsiveCss/recipeForm.css';
import DragScrollWrapper from '../components/recipeForm/dragScrollWrapper';
function RecipeForm() {
    const [step, setStep] = useState(1);
    return (
        <Fragment>
            <RecipeFormProvider>
                {step === 1 && (
                    <DndProvider backend={HTML5Backend}>
                        <DragScrollWrapper ITEM_TYPE={'UTENSILS'}>
                            <DragScrollWrapper ITEM_TYPE={'INGREDIENTS'}>
                                <div className='firstCenterDiv'>
                                    <div className='secondCenterDiv'>
                                        <FirstStep properties={{ setStep }} />
                                    </div>
                                </div>
                            </DragScrollWrapper>
                        </DragScrollWrapper>
                    </DndProvider>
                )}
                {step === 2 && (
                    <DndProvider backend={HTML5Backend} >
                        <DragScrollWrapper ITEM_TYPE={'UTENSILS'}>
                            <DragScrollWrapper ITEM_TYPE={'INGREDIENTS'}>
                                <DragScrollWrapper ITEM_TYPE={'STEP'}>
                                    <div className='firstCenterDiv'>
                                        <div className='secondCenterDiv'>
                                            <SecondStep properties={{ setStep }} />
                                        </div>
                                    </div>
                                </DragScrollWrapper>
                            </DragScrollWrapper>
                        </DragScrollWrapper>
                    </DndProvider>
                )}
            </RecipeFormProvider>
        </Fragment>
    )
}

export default RecipeForm;