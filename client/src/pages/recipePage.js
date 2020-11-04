import React, { Fragment } from 'react';
import { YourRecipeProvider } from '../context/yourRecipe';
import PageWrapper from '../components/recipePage/pageWrapper';
import '../responsiveCss/recipePage.css';
function RecipePage(props) {
    const recipie_id = props.match.params.id;
    return (
        <Fragment>
            <YourRecipeProvider>
                <div className='firstCenterDiv'>
                    <div className='secondCenterDiv'>
                        <PageWrapper recipie_id={recipie_id} />
                    </div>
                </div>
            </YourRecipeProvider>
        </Fragment>
    )
}

export default RecipePage;