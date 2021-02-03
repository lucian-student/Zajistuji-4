import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru na vytvoreni nacini receptu v databzi
*/
export const createUtensil = async (name, setUtensils, recipie_id, source) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            name
        },
        cancelToken: source.token,
        url: `http://localhost:5000/recipe_utensils/create_utensil/${recipie_id}`,
    })
        .then(res => {
            setUtensils(oldUtensils => [res.data, ...oldUtensils])
        })
        .catch(err => console.error(err));
};