import { getAcessToken } from '../../utils/accessToken';
import { jwtTransport } from '../../axios/refreshTokenAxios';

export const recipeQuery = async (page, setYourRecipes, source) => {
    return await jwtTransport
        .get(`http://localhost:5000/recipieQuery/get_recipies`, {
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
            setYourRecipes(oldArray => {
                let tempArr = oldArray.concat(res.data);
                return [...new Map(tempArr.map(item => [item['recipie_id'], item])).values()];
            })
        })
        .catch(err => console.error(err));
};