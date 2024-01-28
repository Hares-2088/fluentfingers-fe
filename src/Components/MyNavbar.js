import { Nav, Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'

export default function MyNavBar() {

    const links = [
        {
            to: "",
            title: "Home"
        },
        {
            to: "exercise",
            title: "Exercise"
        },
        {
            to: "createAccount",
            title: "CreateAccount"
        },
        {
            to: "connect",
            title: "Connect"
        },
        {
            to: "challenges",
            title: "Challenges"
        }
    ]

    return (
        <Navbar style={{ background: ' linear-gradient(90deg, rgba(255,192,0,1) 0%, rgba(250,152,32,1) 100%)', width: '100vh', height: '8vh' }}>
            <Container>

                {/* <LinkContainer to="/" style={{ cursor: 'pointer' }}>
                    <Navbar.Brand className='fs-2'>
                        <Image src="https://static.vecteezy.com/system/resources/previews/024/044/212/original/book-icon-clipart-transparent-background-free-png.png" alt="Logo" style={{ maxHeight: '3rem' }} />
                    </Navbar.Brand>
                </LinkContainer> */}

                <Nav className='me-auto fs-5'>
                    {links.map((link) => (
                        <LinkContainer to={`/${link.to}`} key={link.to}>
                            <Nav.Link>{link.title}</Nav.Link>
                        </LinkContainer>
                    ))}
                </Nav>

            </Container>
        </Navbar>
    );
}