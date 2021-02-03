import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
nacte z databaze commentare receptu
*/
export const commentsQuery = async (page, recipie_id, setComments, source) => {
    return await jwtTransport
        .get(`http://localhost:5000/comments_queries/get_comments`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                recipie_id,
                page
            },
            cancelToken: source.token
        })
        .then(res => {
            // 
            setComments(oldArray => {
                let tempArr = oldArray.concat(res.data);
                return [...new Map(tempArr.map(item => [item['comment_id'], item])).values()];
            })
        })
        .catch(err => console.error(err));
};