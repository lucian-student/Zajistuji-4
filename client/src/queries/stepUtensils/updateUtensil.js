import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
export const updateUtensil = async (
    utensils_id,
    itemIndex,
    stepIndex,
    data,
    steps,
    setSteps,
    recipie_id,
    source,
    setEditing
) => {
    const {
        name
    } = data;
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            id: utensils_id,
            name
        },
        cancelToken: source.token,
        url: `http://localhost:5000/step_utensils/update_utensil/${recipie_id}`,
    })
        .then(res => {
            setSteps(update(steps, {
                [stepIndex]: {
                    utensils: {
                        [itemIndex]: {
                            $merge: res.data
                        }
                    }
                }
            }));
            setEditing(false);
        })
        .catch(err => console.error(err));
};