import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru na poslani nacini receptu klientovi
*/
export const recipeUtensilsQuery = async (recipie_id, setUtensils, source) => {
    return await jwtTransport
        .get(`http://localhost:5000/recipieQuery/get_recipie_utensils`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                id: recipie_id
            },
            cancelToken: source.token
        })
        .then(res => {
            setUtensils([...res.data]);
        })
        .catch(err => console.error(err));
};