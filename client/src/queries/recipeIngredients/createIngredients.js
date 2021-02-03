import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru vytvorit ingredienci receptu v databazi
*/
export const createIngredients = async (name, category, setIngredients, recipie_id, setEditing, source) => {
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
        url: `http://localhost:5000/recipe_ingredients/create_ingredients/${recipie_id}`,
    })
        .then(res => {
            setIngredients(oldIngredients => [res.data, ...oldIngredients]);
            setEditing(false);
        })
        .catch(err => console.error(err));
};