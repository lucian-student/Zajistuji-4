import { getAcessToken } from '../../utils/accessToken';
import { jwtTransport } from '../../axios/refreshTokenAxios';

export const recipeQuery = async (page, setYourRecipes) => {
    return await jwtTransport
        .get(`http://localhost:5000/recipieQuery/get_recipies`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                page
            }
        })
        .then(res => {
            setYourRecipes(oldArray => {
                return [...oldArray.concat(res.data)];
            })
        })
        .catch(err => console.error(err));
};