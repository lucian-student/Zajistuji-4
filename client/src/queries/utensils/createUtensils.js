import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const createUtensil = async (name, setUtensils) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            name
        },
        url: `http://localhost:5000/utensils/create_utensil`,
    })
        .then(res => {
            setUtensils(oldUtensils => [res.data, ...oldUtensils])
        })
        .catch(err => console.error(err));
};