import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import {IoTrashBinSharp} from 'react-icons/io5'
import {FaPen} from 'react-icons/fa'
import {GiCheckMark} from "react-icons/all";
import {Link} from "react-router-dom";
import {useState} from "react";

const Post = ({post, onRemove, onUpdate}) => {
    const [title, setTitle] = useState(`${post.title}`);
    const [body, setBody] = useState(`${post.body}`);

    return (
        <Accordion.Item eventKey={post.id}>
            <Accordion.Header>
                <label htmlFor="post.id" style={{cursor: 'pointer'}}>
                    {post.title}
                </label>
            </Accordion.Header>
            <Accordion.Body>
                <Container>
                    Title: &nbsp;
                    <FaPen className="mb-1" style={{color: 'gray', cursor: 'pointer', width: '15px'}}/>
                    <Form.Control
                        type="text"
                        className="mb-3"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    Description: &nbsp;
                    <FaPen className="mb-1" style={{color: 'gray', cursor: 'pointer', width: '15px'}}/>
                    <Form.Control
                        as="textarea"
                        className="mb-3"
                        rows={3}
                        placeholder="empty"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <Button variant="primary" onClick={() => {
                        post.title = title;
                        post.body = body;
                        onUpdate(post)
                    }} style={{marginRight: '12px'}}>
                        Update &nbsp;
                        <GiCheckMark className="mb-1"/>
                    </Button>
                    <Button variant="outline-danger" onClick={() => onRemove(post.id)} style={{marginRight: '12px'}}>
                        Delete &nbsp;
                        <IoTrashBinSharp className="mb-1"/>
                    </Button>
                    <Link to={`/feed/${post.id}`}>Open</Link>
                </Container>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Post
