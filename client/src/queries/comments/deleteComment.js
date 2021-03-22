import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';
/*
rekne serveru at smaze v databazi komentar
*/
export const deleteComment = async (setRecipe, setComments, comment_id, recipie_id, source) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        cancelToken: source.token,
        url: `/comments/delete_comment/${comment_id}`,
        data: {
            id: recipie_id
        }
    })
        .then(res => {
            setComments(oldComments =>
                [...oldComments.filter(
                    comments => comments.comment_id !== res.data.comment_id
                )]);
            setRecipe(oldRecipe => { return { ...oldRecipe, num_of_comments: res.data.num_of_comments } });
        })
        .catch(err => console.error(err));
};