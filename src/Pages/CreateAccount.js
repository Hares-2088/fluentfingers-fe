import React, { useState } from 'react';
import '../CreateAccount.css';
import { Container, Button, Image } from 'react-bootstrap';

export default function CreateAccount() {
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
      <Image
                    src="/images/logo.png"
                    alt="Logo"
                    style={{
                        position: 'absolute',
                        width: '161px',
                        height: '161px',
                        left: '360px',
                        top: '92px'
                    }}
                />
        <p id='WelcomeMessage'>
          Congratulations on taking the first step!
          <br/>
          Your journey to mastering sign language begins now. Let's sign together!
        </p>
        <form onSubmit={handleSubmit}>
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
          <Button id='BoutonCreateConnect' type='submit'>
            Create Account
          </Button>
        </form>
        <div>
          <p id ='EncouragementMessage'>You're now part of a world where hands brong words to life. </p>
        </div>
      </div>

    </Container>
  );
}
