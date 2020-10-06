import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
export const utensilsQuery = async (page, setUtensils) => {
    return await jwtTransport
        .get(`http://localhost:5000/utensils/get_utensils`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                page
            }
        })
        .then(res => {
            // 
            setUtensils(oldArray => {
                if (oldArray.length > 0) {
                    return [...oldArray];
                } else {
                    return [...oldArray.concat(res.data)];
                }
            })
            console.log(res.data);
        })
        .catch(err => console.error(err));
};