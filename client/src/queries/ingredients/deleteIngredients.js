import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru na smazani ingredience ve spizi
*/
export const deleteInrgedients = async (ingredients_id, setIngredients, source) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        cancelToken: source.token,
        url: `/ingredients/delete_ingredients/${ingredients_id}`,
    })
        .then(res => {
            setIngredients(oldIngredients =>
                [...oldIngredients.filter(
                    ingredients => ingredients.ingredients_id !== res.data.ingredients_id
                )]);
        })
        .catch(err => console.error(err));
};