import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faYoutube, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"; // Correct import for faArrowUp

function Login() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  // Redirect to dashboard if authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://teamhood.com/wp-content/uploads/2023/10/trello-icon.png"
            width="30"
            height="30"
            className="d-inline-block align-top mr-2"
            alt="Duplix Logo"
          />
          Duplix
        </Navbar.Brand>
      </Navbar>

      <section className="bg-gradient py-5" style={{ background: "linear-gradient(rgb(82, 67, 170), rgb(237, 80, 180)) repeat" }}>
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <h1>Welcome to Duplix</h1>
              <p>
                Duplix makes it easier for teams to manage projects and tasks.
                Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done.
              </p>
              <Row className="align-items-center">
                <Col xs={12} md={6} className="d-flex align-items-center">
                <Button
                  variant={isAuthenticated ? "secondary" : "primary"}
                  onClick={isAuthenticated ? handleLogout : handleLogin}
                  className="mr-2"
                >
                {isAuthenticated ? "Logout" : "Login"}
                </Button>
               <div style={{ width: '10px' }}></div>
               <Form inline>
              <Form.Group controlId="formBasicEmail" className="mr-2">
               <Form.Control type="email" placeholder="Enter email" />
               </Form.Group>
              </Form>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6}>
              <Image src="img\img1.png" fluid className="rounded" alt="Welcome Image" />
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="mt-4">
        <Row className="align-items-start">
          <Col xs={12} md={6}>
            <h1>Explore Duplix’s features that help your team succeed</h1>
            <br />
            <h2>Manage tasks with ease.</h2>
            <p>
              Members: Keep everyone accountable and never have to ask “who’s doing that” by adding members to cards for their projects and tasks.
            </p>
            <p>
              Due dates: They're easy to set, hard to miss (with reminders!), and oh-so-satisfying to mark as “done.”
            </p>
            <p>
              Attachments: No more digging through endless email chains to find attachments. Just drag and drop them onto a card so the right files stay with the right tasks.
            </p>
            <p>
              Checklists: Your best tool to overpower overwhelming asks. Break big tasks into small ones, check things off the list, and watch that status bar go to 100% complete.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <Image src="img\img4.png" fluid className="mb-4" alt="Cards Feature" />
          </Col>
        </Row>
        <Row className="mt-4 align-items-start">
          <Col xs={12} md={6} className="order-md-2">
            <h2>Features to help your team succeed</h2>
            <p>
              Powering a productive team means using a powerful tool (and plenty of snacks). From meetings and projects to events and goal setting, Duplix’s intuitive features give any team the ability to quickly set up and customize workflows for just about anything.
            </p>
          </Col>
          <Col xs={12} md={6} className="order-md-1">
            <Image src="img\img2.png" fluid className="mb-4" alt="Duplix Board" />
          </Col>
        </Row>
        <Row className="mt-4 align-items-start">
          <Col xs={12} md={6}>
            <h2>The board is just the beginning</h2>
            <p>
              Lists and cards are the building blocks of organizing work on a Duplix board. Grow from there with task assignments, timelines, productivity metrics, calendars, and more.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <Image src="img\img3.png" fluid className="mb-4" alt="Card Settings" />
          </Col>
        </Row>

        
      </Container>

      <footer className="bg-dark text-white py-5">
        <Container>
          <Row>
            <Col xs={12} md={3}>
              <h5>Follow Us</h5>
              <ul className="list-unstyled">
                <li>
                  <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                  <a href="#!" className="text-white">Facebook</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faTwitter} className="mr-2" />
                  <a href="#!" className="text-white">Twitter</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faInstagram} className="mr-2" />
                  <a href="#!" className="text-white">Instagram</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faYoutube} className="mr-2" />
                  <a href="#!" className="text-white">YouTube</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                  <a href="#!" className="text-white">LinkedIn</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faGithub} className="mr-2" />
                  <a href="#!" className="text-white">GitHub</a>
                </li>
              </ul>
            </Col>
            <Col xs={12} md={3}>
              <h5>Contact Us</h5>
              <address>
                Email: info@duplix.com<br />
                Phone: +91 79046 40981<br />
                Address: No 13 Main Street, Puducherry, India
              </address>
            </Col>
            <Col xs={12} md={3}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#!" className="text-white">Home</a></li>
                <li><a href="#!" className="text-white">About</a></li>
                <li><a href="#!" className="text-white">Services</a></li>
                <li><a href="#!" className="text-white">Contact</a></li>
              </ul>
            </Col>
            <Col xs={12} md={3}>
              <h5>Communicate</h5>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                  Subscribe
                </Button>
                <br/>
              </Form>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} className="text-center">
              <p>&copy; {new Date().getFullYear()} Duplix. All rights reserved.</p>
           
              </Col>
            <Col xs={12} className="text-center mt-3">
              <Button variant="link" className="text-white" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faArrowUp} size="lg" />
              </Button>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Login;
