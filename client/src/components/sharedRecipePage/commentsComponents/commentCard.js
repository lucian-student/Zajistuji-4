import React, { useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineLike } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import { AuthContext } from '../../../context/auth';
import CommentEditForm from './commentEditForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { like_unlike } from '../../../queries/comments/likeComment';
import { deleteComment } from '../../../queries/comments/deleteComment';
import { editComments } from '../../../queries/comments/editComment';
import { CommentsContext } from '../../../context/comments';
import { YourRecipeContext } from '../../../context/yourRecipe';
function CommentCard({ comment }) {
    const [editing, setEditing] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const { comments, setComments, source } = useContext(CommentsContext);
    const { setRecipe, recipe: { recipie_id } } = useContext(YourRecipeContext);

    const {
        comment_id,
        username,
        content,
        num_of_likes,
        user_id,
        index
    } = comment;
    async function handleLike() {
        await like_unlike(index, comments, setComments, comment_id, source);
    }
    async function handleDelete() {
        await deleteComment(setRecipe, setComments, comment_id, recipie_id, source);
    }
    async function handleEditComment(data) {
        await editComments(data.content, comment_id, setComments, comments, index, source, setEditing);
    }
    return (
        <Card>
            <Card.Body>
                <Container>
                    <Row style={{ padding: 0 }}>
                        <Col style={{ padding: 0 }}>
                            <Card.Title style={{ display: 'inline-block' }}>
                                {username}
                            </Card.Title>
                            {(currentUser.user_id === user_id) && (
                                <Dropdown style={{ display: 'inline-block', float: 'right' }}>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        <BiMenu />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Button}
                                            onClick={() => { setEditing(true) }}>
                                            Edit
                                    </Dropdown.Item>
                                        <Dropdown.Item as={Button}
                                            onClick={handleDelete}>
                                            Delete
                                    </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </Col>
                    </Row>
                </Container>
                {!editing ? (
                    <Card.Text>
                        {content}
                    </Card.Text>
                ) : (
                        <CommentEditForm properties={{
                            content,
                            handleEditComment,
                            setEditing
                        }} />
                    )}
                <div>
                    <Button variant='light'
                        onClick={handleLike}>
                        <AiOutlineLike />{num_of_likes}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CommentCard;