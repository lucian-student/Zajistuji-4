import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
posle serveru prikaz na upraveni nacini ve skrini
*/
export const updateUtensil = async (name, utensils_id, setUtensils, utensils, index, source,setEditing) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            name
        },
        cancelToken: source.token,
        url: `/utensils/update_utensil/${utensils_id}`,
    })
        .then(res => {
            let tempUtensils = utensils;
            tempUtensils[index] = res.data;
            setUtensils([...tempUtensils]);
            setEditing(false);
        })
        .catch(err => console.error(err));
};