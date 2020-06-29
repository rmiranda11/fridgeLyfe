import React from "react"

import { AuthUserContext, withAuthorization } from "../Session"
import { PasswordForgetForm } from "../PasswordForget"
import PasswordChangeForm from "../PasswordChange"

function AccountPage() {
    return(
    <AuthUserContext.Consumer>
        {authUser => (
        <div>
            <h1>Account Page: {authUser.email}</h1>
            <PasswordForgetForm />
            <PasswordChangeForm />
        </div>
    )}
    </AuthUserContext.Consumer>
    )
}

//!!authUser means as long as its not null
// i.e. authUser => authUser != null
const condition = authUser => !!authUser

export default withAuthorization(condition)(AccountPage)