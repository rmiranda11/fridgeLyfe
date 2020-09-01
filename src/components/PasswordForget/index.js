import React, { Component } from "react"

import { withFirebase } from "../Firebase"

import TextField from '@material-ui/core/TextField';
import Button from "react-bootstrap/Button"



const PasswordForgetPage = () => (
    <div>
        <h1>Password Forget</h1>      
        <PasswordForgetForm />
    </div>
    )

const INITIAL_STATE = {
    email: "",
    error: null
}

class PasswordForgetFormBase extends Component {
    constructor(props){
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        const { email } = this.state
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
            })
            .catch(error => {
                this.setState({ error })
            })
            event.preventDefault()
        }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render(){
        const { email, error } = this.state
    
        const isInvalid = email === ""
    
        return(
            <form className="pw-forget-form" onSubmit={this.onSubmit}><br/>
                <TextField
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                    variant="outlined"

                /><br/><br/>
                <Button variant="light" className="pw-forget-btn center" disabled={isInvalid} type="submit">
                    Reset My Password
                </Button>

                {error && <p className="error-password center">{error.message}</p>}
            </form>
        )
    }

}





export default PasswordForgetPage
const PasswordForgetForm = withFirebase(PasswordForgetFormBase)

export { PasswordForgetForm }
