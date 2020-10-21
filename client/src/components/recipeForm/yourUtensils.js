import React, { Fragment, useEffect, useContext } from 'react';
import { RecipeFormContext } from '../../context/recipeForm';
import { utensilsQuery } from '../../queries/utensils/defaultUtensils';
import YourUtensilCard from './yourUtensilCard';
import Button from 'react-bootstrap/Button';
import withScrolling from 'react-dnd-scrolling';
const ScrollingComponent = withScrolling('div');
function YourUtensils() {
    const { yourUtensilsPage, setYourUtensilsPage, yourUtensils, setYourUtensils } = useContext(RecipeFormContext);
    useEffect(() => {
        const reciveData = async () => {
            await utensilsQuery(yourUtensilsPage, setYourUtensils);
        }
        reciveData();
    }, [yourUtensilsPage, setYourUtensils]);
    return (
        <Fragment>
            <h3 style={{ textAlign: 'center' }}>Your Utensils</h3>
            <ScrollingComponent className='column'>
                {yourUtensils.map((utensil, index) => (
                    <div key={utensil.utensils_id}>
                        <YourUtensilCard utensil={{
                            ...utensil,
                            index
                        }} />
                    </div>
                ))}
                {(yourUtensils.length / ((yourUtensilsPage + 1) * 10)) >= 1 && (
                    <Button variant='light' style={{ width: '100%' }}
                        onClick={() => { setYourUtensilsPage(page => page + 1) }}>
                        More...
                    </Button>
                )}
            </ScrollingComponent>
        </Fragment>
    )
}

export default YourUtensils;