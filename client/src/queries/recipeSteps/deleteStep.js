import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const deleteStep = async (step_id, setSteps, recipie_id) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        url: `http://localhost:5000/recipe_steps/delete_step/${recipie_id}`,
        data: {
            id: step_id
        }
    })
        .then(res => {
            setSteps(oldSteps =>
                [...oldSteps.filter(
                    step => step.step_id !== res.data.step_id
                )]);
        })
        .catch(err => console.error(err));
};