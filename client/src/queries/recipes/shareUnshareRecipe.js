import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru aby se recept sdilel nebo aby se sdileni zrusilo
*/
export const shareUnshareRecipe = async (setRecipe, shared, recipie_id, source) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            share: !shared
        },
        cancelToken: source.token,
        url: `http://localhost:5000/shared_recipies/share_unshare_recipie/${recipie_id}`,
    })
        .then(res => {
            setRecipe(prevValue => { return { ...prevValue, ...res.data } });
        })
        .catch(err => console.error(err));
};