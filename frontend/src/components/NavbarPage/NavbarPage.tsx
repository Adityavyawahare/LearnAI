import { Navbar, Nav, Container } from 'react-bootstrap';
// import {useNavigate} from 'react-router-dom'
import './NavbarPage.css';

function NavHamburger() { 
    return (
        <Navbar bg="light" expand="lg" className="navbar-left">
        <Container>
            {/* Navbar toggle for hamburger icon */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {/* Navbar collapse for toggling the navigation links */}
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto flex-column">
                <Nav.Item>
                <Nav.Link eventKey="2" href="/profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="1" href="/">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="2" href="/courses">Courses</Nav.Link>
                </Nav.Item>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default NavHamburger;