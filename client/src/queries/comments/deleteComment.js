import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';

export const deleteComment = async (setRecipe, setComments, comment_id, recipie_id) => {
    return await jwtTransport({
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAcessToken(),
            'Content-Type': 'application/json'
        },
        url: `http://localhost:5000/comments/delete_comment/${comment_id}`,
        data:{
            id:recipie_id
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