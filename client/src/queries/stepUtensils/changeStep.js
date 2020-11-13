import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
export const changeStep = async (utensils_id, itemIndex, oldStepIndex, newStepIndex, step_id, steps, setSteps, recipie_id) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            id: utensils_id,
            step_id
        },
        url: `http://localhost:5000/step_utensils/change_step/${recipie_id}`,
    })
        .then(res => {
            setSteps(update(steps, {
                [newStepIndex]: {
                    utensils: {
                        $push: [res.data]
                    }
                },
                [oldStepIndex]: {
                    utensils: {
                        $splice: [
                            [itemIndex, 1]
                        ]
                    }
                }
            }))
        })
        .catch(err => console.error(err));
};