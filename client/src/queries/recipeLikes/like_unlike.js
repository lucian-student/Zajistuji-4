import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
/*
posle prikaz serveru aby ohodnotil recept v databazi
*/
export const like_unlike = async (recipe, setRecipe, recipie_id, source) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            id: recipie_id
        },
        cancelToken: source.token,
        url: `/shared_recipies/like_unlike_recipie`,
    })
        .then(res => {
            const { num_of_likes } = res.data;
            setRecipe(update(recipe, {
                num_of_likes: {
                    $set: num_of_likes
                }
            }));
        })
        .catch(err => console.error(err));
};