import React, { useState } from 'react';
import '../CreateAccount.css'; // Adjust the path to your CSS file
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
      <Container className='Container'>
        <Image
          src="/images/logo.png" // Make sure the path to the image is correct
          alt="Logo"
          className="Logo"
        />
        <div className='CreateAccountMessage'>
          <h5>Congratulations on taking the first step!</h5>
          <p>Your journey to mastering sign language begins now. Let's sign together!</p>
        </div>
        <div className="FormWrapper"> {/* Wrapper for form elements */}
          <form onSubmit={handleSubmit} className="AccountForm">
            <input
              id='UsernameInput'
              className="AccountInput"
              type='text'
              placeholder='Username'
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              id='PasswordInput'
              className="AccountInput"
              type='password'
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
            />
            <Button className='CreateAccountButton' type='submit'>
              Create Account
            </Button>
          </form>
        </div>
        <div className='EncouragementMessage'>
          <p>You're now part of a world where hands bring words to life.</p>
        </div>
      </Container>
    );
  }