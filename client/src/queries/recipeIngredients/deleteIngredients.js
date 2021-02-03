import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru na smazani ingredience receptu
*/
export const deleteInrgedients = async (ingredients_id, setIngredients, recipie_id, source) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        cancelToken: source.token,
        url: `http://localhost:5000/recipe_ingredients/delete_ingredients/${recipie_id}`,
        data: {
            id: ingredients_id
        }
    })
        .then(res => {
            setIngredients(oldIngredients =>
                [...oldIngredients.filter(
                    ingredients => ingredients.ingredients_id !== res.data.ingredients_id
                )]);
        })
        .catch(err => console.error(err));
};