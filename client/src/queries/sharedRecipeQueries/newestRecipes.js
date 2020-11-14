import { getAcessToken } from '../../utils/accessToken';
import { jwtTransport } from '../../axios/refreshTokenAxios';

export const newestRecipes = async (page, setRecipes) => {
    return await jwtTransport
        .get(`http://localhost:5000/shared_recipie_query/shared_recipies`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                page
            }
        })
        .then(res => {
            if (page !== 0) {
                setRecipes(oldArray => {
                    return [...oldArray.concat(res.data)];
                });
            } else {
                setRecipes(res.data);
            }
        })
        .catch(err => console.error(err));
};