import React, { Fragment, useContext, useEffect } from 'react'
import CommentsForm from './commentsForm';
import CommentsDispaly from './commentsDisplay';
import { createComment } from '../../../queries/comments/createComment';
import { YourRecipeContext } from '../../../context/yourRecipe';
import { CommentsContext } from '../../../context/comments';
import { AuthContext } from '../../../context/auth';
import { commentsQuery } from '../../../queries/comments/commentsQuery';
function DataWrapper() {
    const { recipe: { recipie_id }, setRecipe, source } = useContext(YourRecipeContext);
    const { setComments, commentsPage } = useContext(CommentsContext);
    const { currentUser: { name } } = useContext(AuthContext);
    useEffect(() => {
        const reciveData = async () => {
            await commentsQuery(commentsPage, recipie_id, setComments, source);
        }
        reciveData();
    }, [commentsPage, recipie_id, setComments, source]);

    async function handleCreateComment(data) {
        await createComment(recipie_id, data.content, setComments, name, setRecipe, source);
    }
    return (
        <Fragment>
            <CommentsForm properties={{ handleCreateComment }} />
            <CommentsDispaly />
        </Fragment>
    )
}

export default DataWrapper;