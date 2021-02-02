import React, { Fragment, useState } from 'react';
import FirstStep from '../components/recipeForm/firstStep';
import SecondStep from '../components/recipeFormStep2/secondStep';
import { RecipeFormProvider } from '../context/recipeForm';
import { DndProvider } from 'react-dnd';
//import { HTML5Backend } from 'react-dnd-html5-backend';
import '../responsiveCss/recipeForm.css';
import DragScrollWrapper from '../components/recipeForm/dragScrollWrapper';
import { DimensionsProvider } from '../context/dimensions';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
/*
stranka s formularem na recepty
*/
function RecipeForm() {
    const [step, setStep] = useState(1);
    return (
        <Fragment>
            <DimensionsProvider>
                <RecipeFormProvider>
                    {step === 1 && (
                        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
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
                        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
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
            </DimensionsProvider>
        </Fragment>
    )
}

export default RecipeForm;

/*
           */