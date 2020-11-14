import React, { Fragment } from 'react';
import { YourRecipeProvider } from '../context/yourRecipe';
import PageWrapper from '../components/sharedRecipePage/pageWrapper';
function SharedRecipePage(props) {
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

export default SharedRecipePage;