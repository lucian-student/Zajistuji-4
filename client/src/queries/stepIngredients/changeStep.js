import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
/*
posle prikaz serveru, aby zmenil krok ingredience kroku
*/
export const changeStep = async (ingredients_id, itemIndex, oldStepIndex, newStepIndex, step_id, steps, setSteps, recipie_id,source) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            id: ingredients_id,
            step_id
        },
        cancelToken: source.token,
        url: `/step_ingredients/change_step/${recipie_id}`,
    })
        .then(res => {
            setSteps(update(steps, {
                [newStepIndex]: {
                    ingredients: {
                        $push: [res.data]
                    }
                },
                [oldStepIndex]: {
                    ingredients: {
                        $splice: [
                            [itemIndex, 1]
                        ]
                    }
                }
            }))
        })
        .catch(err => console.error(err));
};