import React, { Fragment } from 'react';
import { YourRecipeProvider } from '../context/yourRecipe';
import PageWrapper from '../components/recipePage/pageWrapper';
function RecipePage(props) {
    const recipie_id = props.match.params.id;
    return (
        <Fragment>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <YourRecipeProvider>
                        <PageWrapper recipie_id={recipie_id}/>
                    </YourRecipeProvider>
                </div>
            </div>
        </Fragment>
    )
}

export default RecipePage;