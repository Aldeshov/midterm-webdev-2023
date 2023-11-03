import React from 'react'
import {useState} from 'react'

import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import {Col, Row} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import {useAccordionButton} from 'react-bootstrap/AccordionButton';

export const AddForm = ({onAdd}) => {
    const [validated, setValidated] = useState(false);
    const [showToggled, setShowToggled] = useState(true);

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const formSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            onAdd({title, body})

            setTitle('');
            setBody('');

            setValidated(false);
        }
    }

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header as="h5">
                    <Container>
                        <Row style={{alignItems: 'center'}}>
                            <Col className="text-center">
                                <label htmlFor="0"> Add Post </label>
                            </Col>
                            <Col md="auto">
                                {
                                    showToggled ?
                                        <HideToggle eventKey="0" update={setShowToggled}>Hide</HideToggle>
                                        :
                                        <ShowToggle eventKey="0" update={setShowToggled}>Show</ShowToggle>
                                }
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={formSubmit}>
                            <Form.Group className="mb-3" controlId="formTitleInput">
                                <Form.Label>Post title</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Post"
                                    maxLength="64"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a title.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDescriptionInput">
                                <Form.Label>Post description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={body}
                                    onChange={(event) => setBody(event.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add
                            </Button>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

function ShowToggle({children, eventKey, update}) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
        update(true)
    });

    return (
        <Button variant="success" style={{width: '100px'}} onClick={decoratedOnClick}>
            {children}
        </Button>
    );
}

function HideToggle({children, eventKey, update}) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
        update(false)
    });

    return (
        <Button variant="danger" style={{width: '100px'}} onClick={decoratedOnClick}>
            {children}
        </Button>
    );
}
