import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
export const updateIngredients = async (ingredients, setIngredients, index, name, category, ingredients_id, recipie_id, setEditing, source) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            category,
            name,
            id: ingredients_id
        },
        cancelToken: source.cancelToken,
        url: `http://localhost:5000/recipe_ingredients/update_ingredients/${recipie_id}`,
    })
        .then(res => {
            setIngredients(update(ingredients, {
                [index]: {
                    $merge: res.data
                }
            }));
            setEditing(false);
        })
        .catch(err => console.error(err));
};