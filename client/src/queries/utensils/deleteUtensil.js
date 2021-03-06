import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru na smazani nacini ve skrini
*/
export const deleteUtensil = async (utensils_id, setUtensils, source) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        cancelToken: source.token,
        url: `http://localhost:5000/utensils/delete_utensil/${utensils_id}`,
    })
        .then(res => {
            setUtensils(oldUtnesils =>
                [...oldUtnesils.filter(
                    utensil => utensil.utensils_id !== res.data.utensils_id
                )]);
        })
        .catch(err => console.error(err));
};