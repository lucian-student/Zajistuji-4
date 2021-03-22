import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru vytvorit ingredienci ve spizi
*/
export const createIngredients = async (name, category, setIngredients, source,setEditing) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            category,
            name
        },
        cancelToken: source.token,
        url: `/ingredients/create_ingredients`,
    })
        .then(res => {
            setIngredients(oldIngredients => [res.data, ...oldIngredients])
            setEditing(false);
        })
        .catch(err => console.error(err));
};