import React from "react"
import { Link } from "react-router-dom"
import { AuthUserContext } from "../Session"

import * as ROUTES from "./../../constants/routes"
import SignOutButton from "../SignOut"

// import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from 'react-bootstrap/Button';


const Navigation = () => (
  <div>
    <Navbar bg="primary" variant="dark" style={{ backgroundColor: "red" }}>
      <Navbar.Brand href="./">FridgeLyfe</Navbar.Brand>
          <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
    </Navbar>

  </div>
);


const NavigationAuth = () => (
  <Nav className="mr-auto">
    <Nav.Link href="./home">Home</Nav.Link>
    <Nav.Link href="./account">Account</Nav.Link>
    <SignOutButton />
  </Nav>
);

const NavigationNonAuth = () => (
  <Nav className="mr-auto">
    <Nav.Link href="./SignIn">Sign In</Nav.Link>
  </Nav>
);



export default Navigation