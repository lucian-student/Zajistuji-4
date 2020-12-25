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
    steps,
    btnRef,
    source) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        cancelToken: source.token,
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
            if (btnRef.current) {
                btnRef.current.removeAttribute("disabled");
            }
        })
        .catch(err => {
            if (btnRef.current) {
                btnRef.current.removeAttribute("disabled");
            }
            console.error(err)
        });
};