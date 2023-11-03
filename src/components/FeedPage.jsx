import React from 'react'

import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'

import Post from './Post.jsx'
import {AddForm} from './AddForm'

import {HiOutlineClipboardCheck} from 'react-icons/hi'
import {Link} from "react-router-dom";

let BASE_URL = "https://jsonplaceholder.typicode.com/posts"

export default class FeedPage extends React.Component {
    state = {
        posts: [],
        loading: true
    }

    componentDidMount = () => {
        fetch(`${BASE_URL}`)
            .then((raw) => raw.json())
            .then(res =>
                this.setState({
                    posts: res,
                    loading: false
                }))
            .catch((error) => {
                console.log(error.message)
                alert("Fetch error! API (json) Server may be not running. See console logs");
            })
    }

    add = async (post) => {
        const res = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(post),
        })

        const data = await res.json()
        this.setState({
            posts: [
                ...this.state.posts,
                data
            ]
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
            this.setState({
                posts: [
                    ...this.state.posts.filter(p => {
                        return p.id !== id
                    })
                ],
            })
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
                                <Link to="/profile" style={{marginBottom: '12px'}}>Go to profile</Link>
                            </Row>
                            <Row>
                                <h3>Posts <Badge>{window.location.pathname}</Badge></h3>
                                <label>
                                    All posts:  &nbsp;
                                    <strong>
                                        {this.state.posts.length}
                                    </strong>
                                    <HiOutlineClipboardCheck style={{color: 'blue'}}/>
                                </label>

                                <label>
                                    My posts <code>(userId === 1)</code>: &nbsp;
                                    <strong>
                                        {this.state.posts.filter(post => post.userId === 1).length}
                                    </strong>
                                    <HiOutlineClipboardCheck style={{color: 'orange'}}/>
                                </label>
                            </Row>
                            <Row className="mt-3">
                                <AddForm onAdd={this.add}/>
                            </Row>
                            <Row className="mt-3">
                                {
                                    !this.state.posts.length ?
                                        <label className="text-muted text-center"> No posts to show </label>
                                        :
                                        <h5>Posts</h5>
                                }
                                <Accordion defaultActiveKey="0">
                                    {this.state.posts.map(post => (
                                        <Post
                                            key={post.id}
                                            post={post}
                                            onUpdate={this.update}
                                            onRemove={this.remove}
                                        />
                                    ))}
                                </Accordion>
                            </Row>
                        </Container>
                }
            </React.Fragment>
        )
    }
}
