import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
export const changeStep = async (ingredients_id, itemIndex, oldStepIndex, newStepIndex, step_id, steps, setSteps, recipie_id) => {
    console.log(step_id);
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            id:ingredients_id,
            step_id
        },
        url: `http://localhost:5000/step_ingredients/change_step/${recipie_id}`,
    })
        .then(res => {
            console.log(res.data);
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