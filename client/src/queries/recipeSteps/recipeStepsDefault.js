import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
export const recipeStepsQuery = async (recipie_id, setSteps) => {
    return await jwtTransport
        .get(`http://localhost:5000/recipieQuery/get_steps`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                id: recipie_id
            }
        })
        .then(res => {
            setSteps([...res.data]);
        })
        .catch(err => console.error(err));
};