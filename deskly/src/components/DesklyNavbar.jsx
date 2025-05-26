import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DesklyNavbar() {
  return (
    <Navbar bg="light" shadow-sm expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo.svg"
            width="80"
            height="auto"
            className="d-inline-block align-top me-2"
            alt="Deskly logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/features" className="nav-link-custom">Features</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">About</Nav.Link>
          </Nav>
          <Nav>
            <Button as={Link} to="/login" className="login-button me-2">Login</Button>
            <Button as={Link} to="/register" className="signup-button">Sign Up</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DesklyNavbar;