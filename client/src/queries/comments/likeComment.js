import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
/*
posle prikaz serveru ohodnotit komentar
*/
export const like_unlike = async (index, comments, setComments, comment_id,source) => {
    return await jwtTransport({
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            id: comment_id
        },
        cancelToken: source.token,
        url: `/comments/like_unlike_comment`,
    })
        .then(res => {
            const { num_of_likes } = res.data;
            setComments(update(comments, {
                [index]: {
                    num_of_likes: {
                        $set: num_of_likes
                    }
                }
            }));
        })
        .catch(err => console.error(err));
};