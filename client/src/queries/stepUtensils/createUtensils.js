import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
/*
posle prikaz serveru na vytvoreni nacini kroku
*/
export const createUtensil = async (utensil, index, steps, setSteps, recipie_id, source) => {
    const {
        step_id,
        name
    } = utensil;
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            step_id,
            name
        },
        cancelToken: source.token,
        url: `http://localhost:5000/step_utensils/create_utensil/${recipie_id}`,
    })
        .then(res => {
            setSteps(update(steps, {
                [index]: {
                    utensils: {
                        $push: [res.data]
                    }
                }
            }))
        })
        .catch(err => console.error(err));
};