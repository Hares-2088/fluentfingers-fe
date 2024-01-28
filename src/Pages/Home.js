import React from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import '../Home.css'; // Make sure this path is correct
import CreateAccount from '../Components/CreateAccount';
import Connect from '../Components/Connect';

export default function Home() {
    return (
        <Container className="Container">

            <Image
                src="public/images/logo.png"
                alt="Logo"
                className="Logo"
            />

            <div className="WelcomeMessage">
                <h2>WELCOME TO FLUENT FINGERS</h2>
                <h5>"Speak with your Hands, 
                    <br/>
                    Connect with Hearts"
                </h5>
            </div>

            <div className="ProfileReminder">
                <h5>In order to save your progress you must have a profile:</h5>
            </div>

            <div style={{textAlign: 'center'}} >
                <Connect/>
                <CreateAccount/>
            </div>

        </Container>
    );
}
