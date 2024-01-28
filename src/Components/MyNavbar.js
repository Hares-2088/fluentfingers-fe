import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faDumbbell, faUserPlus, faPlug, faTrophy,faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../NavBar.css';


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
        // {
        //     to: "createAccount",
        //     title: "CreateAccount",
        //     icon: faUserPlus,
        // },
        {
            to: "connect",
            title: "Login",
            icon: faSignInAlt, 
        },
        {
            to: "challenges",
            title: "Challenges",
            icon: faTrophy,
        }
    ];

    return (
        <Navbar className="Navbar">
            <Container>
                <Nav className="me-auto Nav-Link">
                    {links.map((link) => (
                        <LinkContainer to={link.to} key={link.title}>
                            <OverlayTrigger
                                overlay={<Tooltip id={`tooltip-${link.title}`}>{link.title}</Tooltip>}
                                placement="top"
                            >
                                <Nav.Link className="Nav-Link">
                                    <FontAwesomeIcon icon={link.icon} />
                                </Nav.Link>
                            </OverlayTrigger>
                        </LinkContainer>
                    ))}
                </Nav>
            </Container>
        </Navbar>
    );
}
