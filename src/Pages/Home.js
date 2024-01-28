import React from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Home.css'; // Make sure this path is correct
import CreateAccount from './CreateAccount';

export default function Home() {
    let navigate = useNavigate();
    function openCreateAccount(){
        navigate('/createAccount');
    }
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

            <div>
                <Button className="Button">Exercise</Button>
                <Button className="Button">Challenge</Button>
            </div>

            <div className="ProfileReminder">
                In order to save your progress you must have a profile:
            </div>

            <div>
                <Button className="Button">Connect</Button>
                <Button className="Button" onClick={openCreateAccount}>Create account</Button>
            </div>

        </Container>
    );
}
