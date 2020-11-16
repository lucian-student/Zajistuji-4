import React, { Fragment, useEffect, useContext, useState } from 'react';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { commentsQuery } from '../../../queries/comments/commentsQuery';
import Button from 'react-bootstrap/Button';
import CommentsCard from './commentCard';
function CommentsDisplay() {
    const { recipe: { recipie_id } } = useContext(YourRecipeContext);
    const [comments, setComments] = useState([]);
    const [commentsPage, setCommentsPage] = useState(0);
    useEffect(() => {
        const reciveData = async () => {
            await commentsQuery(commentsPage, recipie_id, setComments);
        }
        reciveData();
    }, [commentsPage, recipie_id, setComments])
    return (
        <Fragment>
            {comments.map((comment, index) => (
                <div key={comment.comment_id}>
                    <CommentsCard comment={{
                        ...comment,
                        index
                    }} />
                </div>
            ))}
            {(comments.length / ((commentsPage + 1) * 10)) >= 1 && (
                <Button variant='light' style={{ width: '100%' }}
                    onClick={() => { setCommentsPage(page => page + 1) }}>
                    More...
                </Button>
            )}
        </Fragment>
    )
}

export default CommentsDisplay;