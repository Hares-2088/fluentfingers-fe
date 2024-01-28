import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faDumbbell, faUserPlus, faPlug, faTrophy } from '@fortawesome/free-solid-svg-icons';

export default function MyNavBar() {
    const links = [
        {
            to: "",
            title: "House",
            icon: faHouse,
        },
        {
            to: "exercise",
            title: "Exercise",
            icon: faDumbbell,
        },
        {
            to: "createAccount",
            title: "CreateAccount",
            icon: faUserPlus,
        },
        {
            to: "connect",
            title: "Connect",
            icon: faPlug,
        },
        {
            to: "challenges",
            title: "Challenges",
            icon: faTrophy,
        }
    ];

    return (
        <Navbar style={{ background: 'linear-gradient(90deg, rgba(255,192,0,1) 0%, rgba(250,152,32,1) 100%)', width: '100vw', minHeight: '8vh' }}>
            <Container>
                <Nav className='me-auto fs-5'>
                    {links.map((link) => (
                        <LinkContainer to={`/${link.to}`} key={link.to}>
                            <Nav.Link>
                                <FontAwesomeIcon icon={link.icon} />
                            </Nav.Link>
                        </LinkContainer>
                    ))}
                </Nav>
            </Container>
        </Navbar>
    );
}
