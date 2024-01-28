import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faDumbbell, faUserCircle, faTrophy, faSignInAlt, faMap } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Use Link for navigation
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
        },
        {
            to: "profile",
            title: "Profile",
            icon: faUserCircle,
        },
        {
            to: "roadmap",
            title: "RoadMap",
            icon: faMap,
        }
    ];

    return (
        <Navbar className="Navbar">
                <Nav style={{textAlign: 'center'}} className="Nav-Link">
                    {links.map((link) => (
                        <OverlayTrigger
                            key={link.title}
                            overlay={<Tooltip id={`tooltip-${link.title}`}>{link.title}</Tooltip>}
                            placement="top"
                        >
                            <Link to={link.to} className="nav-link mx-3">
                                <FontAwesomeIcon icon={link.icon} />
                            </Link>
                        </OverlayTrigger>
                    ))}
                </Nav>
        </Navbar>
    );
}
