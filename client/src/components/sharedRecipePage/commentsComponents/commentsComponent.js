import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import DataWrapper from './dataWrapper';
import { CommentsProvider } from '../../../context/comments';
/*
Zobrazi sekci s comentari
*/
function CommentsComponent() {
    const [show, setShow] = useState(false);
    return (
        <Fragment>
            <Button variant='light' style={{ width: '100%' }}
                onClick={() => { setShow(prevValue => !prevValue) }}>
                Comments
            </Button>
            {show && (
                <CommentsProvider>
                    <DataWrapper />
                </CommentsProvider>
            )}
        </Fragment>
    )
}

export default CommentsComponent;