import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import '../CoursesPage/CoursePage.css'
import { useParams } from "react-router-dom";
import NavHamburger from "../NavbarPage/NavbarPage";
import './CourseInfoNavbar.css'

interface Course {
    _id: string,
    id: string;
    name: string;
    professor: string;
    term: string;
  }


const CourseInfoPage= ()=>{
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <NavHamburger />
            <Navbar >
            <Container fluid>
                <Row>
                    {/* Right Aligned Navbar */}
                    <Col lg={3} className="d-none d-lg-block">
                        <Navbar bg="light" expand="lg" className="navbar-right">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="flex-column">
                                    <Nav.Link href={`/courses/${id}/home`}>Home</Nav.Link>
                                    <Nav.Link href={`/courses/${id}/syllabus`}>Syllabus</Nav.Link>
                                    <Nav.Link href={`/courses/${id}/videos`}>Videos</Nav.Link>
                                    <Nav.Link href={`/courses/${id}/assignments`}>Assignments</Nav.Link>
                                    <Nav.Link href={`/courses/${id}/people`}>People</Nav.Link>
                                    <Nav.Link href={`/courses/${id}/chatbot`}>Chatbot</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </Navbar >
        </>
    )
}

export default CourseInfoPage