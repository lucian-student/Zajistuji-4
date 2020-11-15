import React, { Fragment, useState } from 'react';
import CommentsDispaly from './commentsDisplay';
import Button from 'react-bootstrap/Button';
function CommentsComponent() {
    const [show, setShow] = useState(false);
    return (
        <Fragment>
            <Button variant='light' style={{ width: '100%' }}
                onClick={() => { setShow(prevValue => !prevValue) }}>
                Comments
            </Button>
            {show && (
                <CommentsDispaly />
            )}
        </Fragment>
    )
}

export default CommentsComponent;