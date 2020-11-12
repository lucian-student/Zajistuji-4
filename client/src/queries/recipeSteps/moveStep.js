import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
export const moveStep = async (
    step_id,
    start_index,
    finish_index,
    recipie_id
) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            id: step_id,
            start_index,
            finish_index
        },
        url: `http://localhost:5000/recipe_steps/move_step/${recipie_id}`,
    })
        .then(res => {
           console.log(res.data);
        })
        .catch(err => console.error(err));
};