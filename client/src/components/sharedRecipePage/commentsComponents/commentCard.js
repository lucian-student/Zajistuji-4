import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineLike } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
function CommentCard({ comment }) {
    const {
        username,
        content,
        num_of_likes
    } = comment;
    return (
        <Card>
            <Card.Body>
                <Card.Title style={{ display: 'inline-block' }}>
                    {username}
                </Card.Title>
                <Dropdown style={{ display: 'inline-block', float: 'right' }}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        <BiMenu />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Card.Text>
                    {content}
                </Card.Text>
                <div>
                    <Button variant='light'>
                        <AiOutlineLike />{num_of_likes}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CommentCard;