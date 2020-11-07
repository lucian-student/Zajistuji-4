import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const createIngredients = async (name, category, setIngredients, recipie_id) => {
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
        url: `http://localhost:5000/recipe_ingredients/create_ingredients/${recipie_id}`,
    })
        .then(res => {
            setIngredients(oldIngredients => [res.data, ...oldIngredients])
        })
        .catch(err => console.error(err));
};