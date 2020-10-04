import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
export const ingredientsQuery = async (page,setIngredients) => {
    return await jwtTransport
        .get(`http://localhost:5000/ingredients/get_ingredients`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                page
            }
        })
        .then(res => {
            setIngredients(oldArray => [...oldArray.concat(res.data)])
            console.log(res.data);
        })
        .catch(err => console.error(err));
};