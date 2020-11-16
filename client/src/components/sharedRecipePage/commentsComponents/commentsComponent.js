import React, { Fragment, useState } from 'react';
import CommentsDispaly from './commentsDisplay';
import Button from 'react-bootstrap/Button';
import CommentsForm from './commentsForm';
function CommentsComponent() {
    const [show, setShow] = useState(false);
    async function handleCreateComment(data) {
        console.log(data);
    }
    return (
        <Fragment>
            <Button variant='light' style={{ width: '100%' }}
                onClick={() => { setShow(prevValue => !prevValue) }}>
                Comments
            </Button>
            {show && (
                <Fragment>
                    <CommentsForm properties={{ handleCreateComment }} />
                    <CommentsDispaly />
                </Fragment>
            )}
        </Fragment>
    )
}

export default CommentsComponent;