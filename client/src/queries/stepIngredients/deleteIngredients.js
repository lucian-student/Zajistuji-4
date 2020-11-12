import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';

export const deleteInrgedients = async (ingredients_id, ingredientsIndex, stepIndex, setSteps, steps, recipie_id) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
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