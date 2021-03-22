import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru na vytvoreni nacini ve skrini
*/
export const createUtensil = async (name, setUtensils, source, setEditing) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            name
        },
        cancelToken: source.token,
        url: `/utensils/create_utensil`,
    })
        .then(res => {
            setUtensils(oldUtensils => [res.data, ...oldUtensils])
            setEditing(false);
        })
        .catch(err => console.error(err));
};