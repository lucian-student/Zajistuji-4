import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
export const createIngredients = async (ingredients, index, steps, setSteps, recipie_id, source) => {
    const {
        step_id,
        unit,
        value,
        category,
        name
    } = ingredients;
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            step_id,
            unit,
            value,
            category,
            name
        },
        cancelToken: source.token,
        url: `http://localhost:5000/step_ingredients/create_ingredients/${recipie_id}`,
    })
        .then(res => {
            setSteps(update(steps, {
                [index]: {
                    ingredients: {
                        $push: [res.data]
                    }
                }
            }))
        })
        .catch(err => console.error(err));
};