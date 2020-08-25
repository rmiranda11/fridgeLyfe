import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import SignUpPage, { SignUpLink } from "../SignUp"
import { PasswordForgetLink } from "../PasswordForget"
import { withFirebase } from "../Firebase"
import * as ROUTES from "../../constants/routes"

import TextField from '@material-ui/core/TextField';
import Alert from 'react-bootstrap/Alert'
import Button from "react-bootstrap/Button"


const SignInPage = () => (
    <div className={"intro"}>
        <h3 className="sub-title">Sign In</h3>
        <SignInForm /><br />
        {/* <PasswordForgetLink/> */}
        {/* <SignUpLink /> */}
    </div>
)

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

class SignInFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        const { email, password } = this.state

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error })
            })

        event.preventDefault()
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const { email, password, error } = this.state
        const isInvalid = password === '' || email === ''

        return (
            <form className="sign-in" onSubmit={this.onSubmit}>

                <TextField
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    label="Email Address"
                    variant="outlined"
                /><br /><br />
                <TextField
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    label="Password"
                    variant="outlined"
                /><br /> {error && <p className="error">{error.message}</p>}
                <br /><br />

                <Button
                    className={"signup-btn"}
                    disabled={isInvalid}
                    variant="light"
                    type="submit">
                    Sign In
            </Button>
            </form>
        )
    }
}


const SignInForm = withRouter(withFirebase(SignInFormBase));


export default SignInPage

export { SignInForm }