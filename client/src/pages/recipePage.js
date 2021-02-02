import React, { Fragment } from 'react';
import { YourRecipeProvider } from '../context/yourRecipe';
import PageWrapper from '../components/recipePage/pageWrapper';
import '../responsiveCss/recipePage.css';
import { DndProvider } from 'react-dnd';
//import { HTML5Backend } from 'react-dnd-html5-backend';
import DragScrollWrapper from '../components/recipeForm/dragScrollWrapper';
import { DimensionsProvider } from '../context/dimensions';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
/*
Stranka s receptem
*/
function RecipePage(props) {
    const recipie_id = props.match.params.id;
    return (
        <Fragment>
            <DimensionsProvider>
                <YourRecipeProvider>
                    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                        <DragScrollWrapper ITEM_TYPE={'UTENSILS'}>
                            <DragScrollWrapper ITEM_TYPE={'INGREDIENTS'}>
                                <DragScrollWrapper ITEM_TYPE={'STEP'}>
                                    <div className='firstCenterDiv'>
                                        <div className='secondCenterDiv'>
                                            <PageWrapper recipie_id={recipie_id} />
                                        </div>
                                    </div>
                                </DragScrollWrapper>
                            </DragScrollWrapper>
                        </DragScrollWrapper>
                    </DndProvider>
                </YourRecipeProvider>
            </DimensionsProvider>
        </Fragment >
    )
}

export default RecipePage;