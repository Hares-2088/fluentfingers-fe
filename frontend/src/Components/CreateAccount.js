import React, { useState } from 'react';
import '../CreateAccount.css'; // Adjust the path to your CSS file
import { Container, Button, Modal, Form, Row, Col } from 'react-bootstrap';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
    setShowModal(false);
  };

  return (
    <Container style={{margin: 'auto'}}>

      <Button onClick={handleShow} className='Button' style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}>
        Create Account
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>

        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form onSubmit={handleSubmit}>

            <Row className="mb-3">

              <Col sm={4} className="d-flex align-items-center justify-content-sm-end pe-sm-3">
                <Form.Label htmlFor="formUsername" className="mb-0">Username:</Form.Label>
              </Col>

              <Col sm={8} className='mt-5'>
                <Form.Control
                  id="formUsername"
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Username'
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={4} className="d-flex align-items-center justify-content-sm-end pe-sm-3">
                <Form.Label htmlFor="formPassword" className="mb-0">Password:</Form.Label>
              </Col>

              <Col sm={8} className='mt-5'>
                <Form.Control
                  id="formPassword"
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-center mt-1">
              <Button variant="success" type="submit">
                Create Account
              </Button>
            </div>

          </Form>

        </Modal.Body>

        <Modal.Footer>
          <p className='encouragement-message'>You're now part of a world where hands bring words to life.</p>
        </Modal.Footer>
        
      </Modal>
    </Container>
  );
}