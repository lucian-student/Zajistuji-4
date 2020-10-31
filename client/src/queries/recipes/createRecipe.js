import { getAcessToken } from '../../utils/accessToken';
import { jwtTransport } from '../../axios/refreshTokenAxios';

export const createRecipe = async (
    name,
    category,
    description,
    imageUrl,
    imageReference,
    ingredients,
    utensils,
    steps) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            category,
            name,
            description,
            imageUrl,
            imageReference,
            ingredients,
            utensils,
            steps
        },
        url: `http://localhost:5000/recipies/create_recipie`,
    })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.error(err));
};