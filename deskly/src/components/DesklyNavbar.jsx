import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { toggleTheme } from '../store/themeSlice';
import { FaSun, FaMoon } from 'react-icons/fa';

function DesklyNavbar() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'light'} variant={theme === 'dark' ? 'dark' : 'light'} shadow-sm expand="lg">
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
            {isAuthenticated ? (
              <>
                <span className="navbar-text me-2">Welcome, {user?.email}</span>
                <Button variant="outline-primary" onClick={handleLogout} className="me-2">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" className="login-button me-2">Login</Button>
                <Button as={Link} to="/register" className="signup-button me-2">Sign Up</Button>
              </>
            )}
            <Button variant="outline-secondary" onClick={handleThemeToggle}>
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DesklyNavbar;