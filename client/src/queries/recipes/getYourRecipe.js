import { getAcessToken } from '..//../utils/accessToken';
import { jwtTransport } from '../../axios/refreshTokenAxios';

export const getYourRecipe = async (id, setRecipe,) => {
    return await jwtTransport
        .get(`http://localhost:5000/recipieQuery/get_recipe/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            setRecipe(res.data);
        })
        .catch(err => console.error(err));
};