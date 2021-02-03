import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
/*
posle prikaz serveru na smazani ingredience kroku
*/
export const deleteInrgedients = async (ingredients_id, ingredientsIndex, stepIndex, setSteps, steps, recipie_id,source) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        cancelToken: source.token,
        url: `http://localhost:5000/step_ingredients/delete_ingredients/${recipie_id}`,
        data: {
            id: ingredients_id
        }
    })
        .then(res => {
            setSteps(update(steps, {
                [stepIndex]: {
                    ingredients: {
                        $splice: [
                            [ingredientsIndex, 1]
                        ]
                    }
                }
            }));
        })
        .catch(err => console.error(err));
};