import { getAcessToken } from '..//../utils/accessToken';
import { jwtTransport } from '../../axios/refreshTokenAxios';
/*
posle prikaz serveru na poslani sdileneho receptu klientovi
*/
export const getRecipe = async (id, setRecipe,source) => {
    return await jwtTransport
        .get(`/shared_recipie_query/get_recipe/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            cancelToken: source.token
        })
        .then(res => {
            setRecipe(res.data);
        })
        .catch(err => console.error(err));
};