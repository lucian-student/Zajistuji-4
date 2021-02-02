import React, { Fragment, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import CommentsCard from './commentCard';
import { CommentsContext } from '../../../context/comments';
/*
Zobrazi karty komentaru
*/
function CommentsDisplay() {
    const { comments, setCommentsPage, commentsPage } = useContext(CommentsContext);
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