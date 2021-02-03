import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
/*
posle prikaz serveru na upraveni ingredience kroku v databazi
*/
export const updateIngredients = async (data, ingredients_id, itemIndex, stepIndex, steps, setSteps, recipie_id, source) => {
    const {
        unit,
        value,
        name,
        category
    } = data;
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            id: ingredients_id,
            unit,
            value,
            name,
            category
        },
        cancelToken: source.token,
        url: `http://localhost:5000/step_ingredients/update_ingredients/${recipie_id}`,
    })
        .then(res => {
            setSteps(update(steps, {
                [stepIndex]: {
                    ingredients: {
                        [itemIndex]: {
                            $merge: res.data
                        }
                    }
                }
            }))
        })
        .catch(err => console.error(err));
};