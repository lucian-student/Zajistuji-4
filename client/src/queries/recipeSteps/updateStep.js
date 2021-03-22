import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
/*
posle prikaz serveru na upraveni kroku v  databazi
*/
export const updateStep = async (
    step_id,
    duration,
    name,
    description,
    index,
    recipie_id,
    setSteps,
    steps,
    source,
    setEditing
) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            id: step_id,
            duration,
            name,
            description
        },
        cancelToken: source.token,
        url: `/recipe_steps/update_step/${recipie_id}`,
    })
        .then(res => {
            setSteps(update(steps, {
                [index]: {
                    $merge: res.data
                }
            }))
            setEditing(false);
        })
        .catch(err => console.error(err));
};