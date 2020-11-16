import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';

export const like_unlike = async (recipe, setRecipe, recipie_id) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            id: recipie_id
        },
        url: `http://localhost:5000/shared_recipies/like_unlike_recipie`,
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