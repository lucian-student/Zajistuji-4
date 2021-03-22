import { getAcessToken } from '../../utils/accessToken';
import { jwtTransport } from '../../axios/refreshTokenAxios';
/*
posle prikaz serveru na poslani nejlepe ohodnocenych receptu klientovi
*/
export const popularRecipes = async (page, setRecipes,source) => {
    return await jwtTransport
        .get(`/shared_recipie_query/popular_recipes`, {
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
            if (page !== 0) {
                setRecipes(oldArray => {
                    let tempArr = oldArray.concat(res.data);
                    return [...new Map(tempArr.map(item => [item['recipie_id'], item])).values()];
                });
            } else {
                setRecipes(res.data);
            }
        })
        .catch(err => console.error(err));
};