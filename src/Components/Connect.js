import React, { useState } from 'react';
import '../Connection.css';
import { Container, Button } from 'react-bootstrap';

export default function Connect() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
  };

  return (
    <Container>
      <div>
        <div id='Logo' />
        <p id='WelcomeMessage'>
          We are happy to see you again!
          <br />
          Please connect to your profile:
        </p>
        <Form onSubmit={handleSubmit}>
          <div id='UsernameLabel'> Username</div>
          <input
            id='UsernameInput'
            type='text'
            value={username}
            onChange={handleUsernameChange}
          />
          <div id='PasswordLabel'> Password </div>
          <input
            id='PasswordInput'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
          <Button id='BoutonConnect' type='submit'>
            Connect
          </Button>
        </Form>
        <div>
          <p id='EncouragementMessage'>Let's pick up where we left off and turn your fingers into fluent storytellers. </p>
        </div>
      </div>

    </Container>
  );
}
