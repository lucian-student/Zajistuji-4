import React, { Fragment, useEffect, useState } from 'react';
import { utensilsQuery } from '../../queries/utensils/defaultUtensils';
import YourUtensilCard from './yourUtensilCard';
import Button from 'react-bootstrap/Button';
import withScrolling from 'react-dnd-scrolling';
import axios from 'axios';
/*
Zobrazi karty vaseho nacini v prvnim kroku formulare na recepty
*/
const ScrollingComponent = withScrolling('div');
function YourUtensils() {
    const [yourUtensilsPage, setYourUtensilsPage] = useState(0);
    const [yourUtensils, setYourUtensils] = useState([]);
    useEffect(() => {
        const source = axios.CancelToken.source();
        const reciveData = async () => {
            await utensilsQuery(yourUtensilsPage, setYourUtensils, source);
        }
        reciveData();
        return () => {
            source.cancel('canceled');
        }
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