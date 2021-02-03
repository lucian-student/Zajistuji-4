import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz databazi abys klientovi poslal server ingredience do spize
*/
export const ingredientsQuery = async (page, setIngredients, source) => {
    return await jwtTransport
        .get(`http://localhost:5000/ingredients/get_ingredients`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                page
            },
            cancelToken: source.token
        })
        .then(res => {
            setIngredients(oldArray => {
                let tempArr = oldArray.concat(res.data);
                return [...new Map(tempArr.map(item => [item['ingredients_id'], item])).values()];
            })
        })
        .catch(err => console.error(err));
};