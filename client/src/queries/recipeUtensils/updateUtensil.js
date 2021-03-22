import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
/*
posle prikaz serveru na upravu nacini receptu
*/
export const updateUtensil = async (utensils, setUtensils, index, name, utensils_id, recipie_id, setEditing, source) => {
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
        cancelToken: source.token,
        url: `/recipe_utensils/update_utensil/${recipie_id}`,
    })
        .then(res => {
            setUtensils(update(utensils, {
                [index]: {
                    $merge: res.data
                }
            }))
            setEditing(false);
        })
        .catch(err => console.error(err));
};