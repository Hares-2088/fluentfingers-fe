import React from 'react'
import '../Home.css'
import { Container,Button } from 'react-bootstrap'

export default function Home() {

    return (
        <Container>
            <div>
                <div id='Logo' />
                <div id='Ellipse10'>
                    <p id='WelcomeMessage'>
                        WELCOME TO <br />
                        FLUENT FINGERS
                    </p>
                </div>
                <div>
                    <div id='WelcomeMessage'>
                        <p>
                            Speack with your Hands,<br />
                            Connect with Hearts
                        </p>
                    </div>
                    <Button id='ButtonExercise'>Exercise</Button>
                </div>
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
                    <div id='ProfileReminder'><span>WELCOME TO <br />FLUENTFINGERS<br /></span><span><br />Speak with you Hands, <br />Connect with Hearts</span></div>
                </div>
            </div>

        </Container>
    )
}
