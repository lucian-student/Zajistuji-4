import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
export const updateUtensil = async (utensils, setUtensils, index, name, utensils_id, recipie_id) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            name,
            id: utensils_id
        },
        url: `http://localhost:5000/recipe_utensils/update_utensil/${recipie_id}`,
    })
        .then(res => {
            setUtensils(update(utensils, {
                [index]: {
                    $merge: res.data
                }
            }))
        })
        .catch(err => console.error(err));
};