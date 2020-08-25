import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import TextField from '@material-ui/core/TextField';
import Button from "react-bootstrap/Button"


const SignUpPage = () => (
  <div>
    <h4 className="sub-title">SignUp</h4><br/>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles,
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form className="signup" onSubmit={this.onSubmit}>
        <TextField
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
          label="Full Name"
          variant="outlined"
        /><br /><br />
        <TextField
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          label="Email Address"
          variant="outlined"
        /><br /><br />
        <TextField
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          label="Password"
          variant="outlined"
        /><br /><br />
        <TextField
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          variant="outlined"
        /><br /><br />
        {/* <label>
          Admin:
          <TextField
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label> */}
        <Button className="signup-btn" disabled={isInvalid} variant="light"
          type="submit">
          Sign Up
        </Button>

        {error && <p class="error">{error.message}</p>}
      </form>
    );
  }
}



const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm };