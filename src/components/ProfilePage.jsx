import React from 'react'

import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";

let BASE_URL = "https://jsonplaceholder.typicode.com/users"

export default class ProfilePage extends React.Component {
    state = {}

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true
        };
    }

    componentDidMount = () => {
        fetch(`${BASE_URL}/1`)
            .then((raw) => raw.json())
            .then(res =>
                this.setState({
                    user: res,
                    loading: false
                }))
            .catch((error) => {
                console.log(error.message)
                alert("Fetch error! API (json) Server may be not running. See console logs");
            })
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
                                <h3>User #1 <Badge>{window.location.pathname}</Badge></h3>
                            </Row>
                            <Row className="mt-3">
                                {
                                    !this.state.user ?
                                        <label className="text-muted text-center"> No User profile to show </label>
                                        :
                                        <Container>
                                            <Form.Control
                                                type="text"
                                                className="mb-3"
                                                placeholder="Name"
                                                value={this.state.user.name}
                                                onChange={(e) => this.setState((state) => ({
                                                    user: {
                                                        ...state.user,
                                                        name: e.target.value
                                                    }
                                                }))}
                                            />
                                            <Form.Control
                                                type="text"
                                                className="mb-3"
                                                placeholder="username"
                                                value={this.state.user.username}
                                                onChange={(e) => this.setState((state) => ({
                                                    user: {
                                                        ...state.user,
                                                        username: e.target.value
                                                    }
                                                }))}
                                            />
                                            <Form.Control
                                                type="text"
                                                className="mb-3"
                                                placeholder="email"
                                                value={this.state.user.email}
                                                onChange={(e) => this.setState((state) => ({
                                                    user: {
                                                        ...state.user,
                                                        email: e.target.value
                                                    }
                                                }))}
                                            />
                                        </Container>
                                }

                            </Row>
                        </Container>
                }
            </React.Fragment>
        )
    }
}
