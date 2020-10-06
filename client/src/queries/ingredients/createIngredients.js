import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const createIngredients = async (name, category, setIngredients) => {
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
        url: `http://localhost:5000/ingredients/create_ingredients`,
    })
        .then(res => {
            setIngredients(oldIngredients => [res.data, ...oldIngredients])
        })
        .catch(err => console.error(err));
};