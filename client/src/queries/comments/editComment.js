import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
import update from 'immutability-helper';
export const editComments = async (content, comment_id, setComments, comments, index) => {
    return await jwtTransport({
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        data: {
            content
        },
        url: `http://localhost:5000/comments/update_comment/${comment_id}`,
    })
        .then(res => {
            setComments(update(comments, {
                [index]: {
                    $merge: res.data
                }
            }))
        })
        .catch(err => console.error(err));
};