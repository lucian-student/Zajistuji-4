import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru upravit recept v databazi
*/
export const updateRecipe = async (setRecipe, data, setRemoveImage, source) => {
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
        cancelToken: source.token,
        url: `http://localhost:5000/recipeUpdate/update_recipe_data/${id}`,
    })
        .then(res => {
            setRemoveImage(false);
            setRecipe(res.data);
        })
        .catch(err => console.error(err));
};