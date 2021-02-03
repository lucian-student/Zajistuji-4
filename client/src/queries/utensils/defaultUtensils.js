import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle prikaz serveru na poslani nacini do skrine
*/
export const utensilsQuery = async (page, setUtensils, source) => {
    return await jwtTransport
        .get(`http://localhost:5000/utensils/get_utensils`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                page
            },
            cancelToken: source.token
        })
        .then(res => {
            setUtensils(oldArray => {
                let tempArr = oldArray.concat(res.data);
                return [...new Map(tempArr.map(item => [item['utensils_id'], item])).values()];
            })
        })
        .catch(err => console.error(err));
};