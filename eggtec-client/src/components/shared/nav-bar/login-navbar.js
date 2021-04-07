import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import HomePage from '../home/home-page';
import Logout from '../login/logout';

const LoginNavBar = () => (
  <Navbar expand="lg" style={{ backgroundColor: '#3598DC' }}>
    <LinkContainer style={{ color: 'white' }} to="/">
      <Navbar.Brand>Eggtec Warehouse Management</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        {/* <LinkContainer to="/login"> */}
        {/* <Nav.Link style={{ color: 'white' }} href="/home" onClick={HomePage}>Home</Nav.Link> */}
        <Nav.Link style={{ color: 'white' }} href="/" onClick={Logout}>Logout</Nav.Link>
        {/* </LinkContainer> */}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default LoginNavBar;
