import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';

export const deleteUtensil = async (utensils_id, utensilsIndex, stepIndex, setSteps, steps, recipie_id, source) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        cancelToken: source.token,
        url: `http://localhost:5000/step_utensils/delete_utensil/${recipie_id}`,
        data: {
            id: utensils_id
        }
    })
        .then(res => {
            setSteps(update(steps, {
                [stepIndex]: {
                    utensils: {
                        $splice: [
                            [utensilsIndex, 1]
                        ]
                    }
                }
            }));
        })
        .catch(err => console.error(err));
};