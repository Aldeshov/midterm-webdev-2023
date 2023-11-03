import React from 'react'

import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'

import Post from './Post.jsx'
import Button from "react-bootstrap/Button";
import {AiFillDislike, AiFillLike} from "react-icons/all";
import {ButtonGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

let BASE_URL = "https://jsonplaceholder.typicode.com/posts"

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default class PostPage extends React.Component {
    state = {}

    constructor(props) {
        super(props);
        this.state = {
            post: null,
            likes: getRandomInt(10000),
            dislikes: getRandomInt(1000),
            loading: true
        };
    }

    componentDidMount = () => {
        fetch(`${BASE_URL}/${window.location.pathname.slice(6) || 0}`)
            .then((raw) => raw.json())
            .then(res =>
                this.setState({
                    post: res,
                    loading: false
                }))
            .catch((error) => {
                console.log(error.message)
                alert("Fetch error! API (json) Server may be not running. See console logs");
            })
    }

    update = async (post) => {
        const res = await fetch(`${BASE_URL}/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(post),
        })

        const data = await res.json()
        alert(`Updated! Post #${data.id}`)
    }

    remove = async (id) => {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        })

        res.status === 200 ?
            window.location.href = '/'
            :
            alert('Error Deleting This Post')
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.loading ?
                        <label className="text-muted">
                            Loading...
                        </label>
                        :
                        <Container>
                            <Row className="mt-3">
                                <h1>
                                    <Badge bg="secondary">Twitter Midterm</Badge>
                                </h1>
                            </Row>
                            <Row>
                                <Link to="/feed" style={{marginBottom: '12px'}}>Go to feed</Link>
                            </Row>
                            <Row>
                                <h3>Post <Badge>{window.location.pathname}</Badge></h3>
                                <p>
                                    Likes: <code>{this.state.likes}</code>
                                </p>
                                <p>
                                    Dislikes: <code>{this.state.dislikes}</code>
                                </p>
                            </Row>
                            <Row>
                                <ButtonGroup style={{width: 'fit-content'}}>
                                    <Button variant="success"
                                            onClick={() => this.setState((state) => ({likes: state.likes + 1}))}>
                                        Like &nbsp;
                                        <AiFillLike className="mb-1"/>
                                    </Button>
                                    <Button variant="danger"
                                            onClick={() => this.setState((state) => ({dislikes: state.dislikes + 1}))}>
                                        Dislike &nbsp;
                                        <AiFillDislike className="mb-1"/>
                                    </Button>
                                </ButtonGroup>
                            </Row>
                            <Row className="mt-3">
                                {
                                    !this.state.post ?
                                        <label className="text-muted text-center"> No post to show </label>
                                        :
                                        <Accordion defaultActiveKey="0">
                                            <Post
                                                key={this.state.post.id}
                                                post={this.state.post}
                                                onUpdate={this.update}
                                                onRemove={this.remove}
                                            />
                                        </Accordion>
                                }

                            </Row>
                        </Container>
                }
            </React.Fragment>
        )
    }
}
