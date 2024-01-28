import React from 'react'
import '../Home.css'
import { Container, Button, Image } from 'react-bootstrap'

export default function Home() {

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
                        left: '114px',
                        top: '92px'
                    }}
                />

                <div id='Ellipse10'>
                    <p id='WelcomeMessage'>
                        WELCOME TO <br />
                        FLUENT FINGERS
                    </p>

                    <p id='WelcomeMessage'>
                        Speak with your Hands,<br />
                        Connect with Hearts
                    </p>
                </div>
                <Button id='ButtonExercise'>Exercise</Button>

                <div>
                    <div></div>
                    <div id='ButtonChallenge'>Challenge</div>
                </div>
                <div>
                    <div></div>
                    <div id='BoutonConnectLeft'>Connect</div>
                </div>
                <div>
                    <div></div>
                    <div id='ButtonConnectRight'>Create account</div>
                </div>
                <div id='ProfileReminder'>In order to save your progress you must have a profile:</div>
                <div>
                    <div></div>
                </div>
            </div>

        </Container>
    )
}
