import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru at upravi ingredienci v databazi
*/
export const updateIngredients = async (name, category, ingredients_id, setIngredients, ingredients, index, source, setEditing) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            category,
            name
        },
        cancelToken: source.token,
        url: `/ingredients/update_ingredients/${ingredients_id}`,
    })
        .then(res => {
            let tempIngredients = ingredients;
            tempIngredients[index] = res.data;
            setIngredients([...tempIngredients]);
            setEditing(false);
        })
        .catch(err => console.error(err));
};