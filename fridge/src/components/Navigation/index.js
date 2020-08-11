import React from "react"
import { Link } from "react-router-dom"
import { AuthUserContext } from "../Session"

import * as ROUTES from "./../../constants/routes"
import SignOutButton from "../SignOut"
import * as ROLES from '../../constants/roles';

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from 'react-bootstrap/Button';
import NavDropdown from "react-bootstrap/NavDropdown"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"


const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);


const NavigationAuth = ({authUser}) => (
<Navbar className="navbar" bg="light" expand="lg">
  <Navbar.Brand href="./">Fridge-Lyfe</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
    <Nav.Link href="./home">Home</Nav.Link>
    <Nav.Link href="./account">Account</Nav.Link>
    {/* {authUser.roles.includes(ROLES.ADMIN) && ( */}
    <Nav.Link href="./admin">Admin</Nav.Link>
    {/* )} */}
      {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
      <SignOutButton />
    </Nav>
  </Navbar.Collapse>
</Navbar>
);

const NavigationNonAuth = () => (
<Navbar className="navbar"  expand="lg">
  <Navbar.Brand href="./">Fridge-Lyfe</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
  {/* <Nav.Link href="./signin">Sign In</Nav.Link>
    <Nav.Link href="./signup">Sign Up</Nav.Link> */}
    </Nav>
  </Navbar.Collapse>
</Navbar>
);


export default Navigation;