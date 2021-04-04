import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import EmployeeDashboard from '../../client/dashboard/dashboard';
import ProfilePage from '../../client/profile/profile';
import HomePage from '../home/home-page';
import Logout from '../login/logout';

const LoginNavBar = () => {



  return (
    <Navbar bg="dark" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>Eggtec Warehouse Management</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* <LinkContainer to="/login"> */}
            
            <Nav.Link href="/home" onClick={HomePage}>Home</Nav.Link>
            <Nav.Link href="/" onClick={Logout}>Logout</Nav.Link>
          {/* </LinkContainer> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default LoginNavBar;
