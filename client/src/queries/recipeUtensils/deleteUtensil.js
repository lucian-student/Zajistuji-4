import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru na smazani nacini receptu v databazi
*/
export const deleteUtensil = async (utensils_id, setUtensils, recipie_id, source) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        cancelToken: source.token,
        url: `http://localhost:5000/recipe_utensils/delete_utensil/${recipie_id}`,
        data: {
            id: utensils_id
        }
    })
        .then(res => {
            setUtensils(oldUtnesils =>
                [...oldUtnesils.filter(
                    utensil => utensil.utensils_id !== res.data.utensils_id
                )]);
        })
        .catch(err => console.error(err));
};