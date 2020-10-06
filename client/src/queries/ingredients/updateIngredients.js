import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const updateIngredients = async (name, category, ingredients_id, setIngredients, ingredients, index) => {
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
        url: `http://localhost:5000/ingredients/update_ingredients/${ingredients_id}`,
    })
        .then(res => {
            let tempIngredients = ingredients;
            tempIngredients[index] = res.data;
            setIngredients([...tempIngredients]);
        })
        .catch(err => console.error(err));
};