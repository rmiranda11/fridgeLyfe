import React from "react"

import { withFirebase } from "../Firebase"

import Button from 'react-bootstrap/Button';


const SignOutButton = ({ firebase }) => (
    <Button variant="danger" className="sign-out-btn" onClick={firebase.doSignOut}>SignOut</Button> 

)

export default withFirebase(SignOutButton)