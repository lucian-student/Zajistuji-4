import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
export const recipeIngredientsQuery = async (recipie_id, setIngredients) => {
    return await jwtTransport
        .get(`http://localhost:5000/recipieQuery/get_recipie_ingredients`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                id: recipie_id
            }
        })
        .then(res => {
            setIngredients([...res.data]);
        })
        .catch(err => console.error(err));
};