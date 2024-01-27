import React from 'react'
import '../Styling/Home.css'
import { Container } from 'react-bootstrap'

export default function Home() {
    return (
        <Container>
            <div>
                <div id='Logo' />
                <div>
                    <p>
                        Speack with your Hands,<br />
                        Connect with Hearts
                    </p>
                </div>
                <div>
                    <div>
                        <p>
                            Speack with your Hands,<br />
                            Connect with Hearts
                        </p>
                    </div>
                    <Button id='BoutonExercise'>Exercise</Button>
                </div>
                <div>
                    <div></div>
                    <div>Challenge</div>
                </div>
                <div>
                    <div></div>
                    <div>Connect</div>
                </div>
                <div>
                    <div></div>
                    <div>Create account</div>
                </div>
                <div>In order to save your progress you must have a profile:</div>
                <div>
                    <div></div>
                    <div><span>WELCOME TO <br />FLUENTFINGERS<br /></span><span><br />Speak with you Hands, <br />Connect with Hearts</span></div>
                </div>
            </div>

        </Container>
    )
}
