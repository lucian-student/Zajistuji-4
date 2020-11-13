import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const shareUnshareRecipe = async (setRecipe, shared, recipie_id) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            share: !shared
        },
        url: `http://localhost:5000/shared_recipies/share_unshare_recipie/${recipie_id}`,
    })
        .then(res => {
            setRecipe(prevValue => { return { ...prevValue, ...res.data } });
        })
        .catch(err => console.error(err));
};