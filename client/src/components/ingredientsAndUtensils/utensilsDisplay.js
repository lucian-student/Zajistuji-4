import React, { Fragment, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { IngredientsAndUtensilsContext } from '../../context/ingredientsAndUtensils';
import { utensilsQuery } from '../../queries/utensils/defaultUtensils';
import UtensilsCard from './utensilsCard';
function UtensilsDisplay() {
    const { setUtensils, utensilsPage, setUtensilsPage, utensils, source } = useContext(IngredientsAndUtensilsContext);
    useEffect(() => {
        const reciveData = async () => {
            await utensilsQuery(utensilsPage, setUtensils, source);
        }
        reciveData();
    }, [utensilsPage, setUtensils,source])
    return (
        <Fragment>
            {utensils.map((utensil, index) => (
                <div key={utensil.utensils_id}>
                    <UtensilsCard utensil={{
                        ...utensil,
                        index
                    }} />
                </div>
            ))}
            {(utensils.length / ((utensilsPage + 1) * 10)) >= 1 && (
                <Button variant='light' style={{ width: '100%' }}
                    onClick={() => { setUtensilsPage(page => page + 1) }}>
                    More...
                </Button>
            )}
        </Fragment>
    )
}

export default UtensilsDisplay;