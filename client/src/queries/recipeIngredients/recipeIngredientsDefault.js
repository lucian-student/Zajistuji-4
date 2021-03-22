import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru aby mu z databze poslal ingredience receptu
*/
export const recipeIngredientsQuery = async (recipie_id, setIngredients, source) => {
    return await jwtTransport
        .get(`/recipieQuery/get_recipie_ingredients`, {
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
            setIngredients([...res.data]);
        })
        .catch(err => console.error(err));
};