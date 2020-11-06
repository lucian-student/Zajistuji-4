import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const updateRecipe = async (setRecipe, data) => {
    const {
        id,
        name,
        category,
        description,
        imageUrl,
        image_reference
    } = data;
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            name,
            category,
            description,
            imageUrl,
            image_reference
        },
        url: `http://localhost:5000/recipeUpdate/update_recipe_data/${id}`,
    })
        .then(res => {
            console.log(res.data);
            setRecipe(res.data);
        })
        .catch(err => console.error(err));
};