import React from "react"

import { AuthUserContext, withAuthorization } from "../Session"
import PasswordChangeForm from "../PasswordChange"

function AccountPage() {
    return(
    <AuthUserContext.Consumer>
        {authUser => (
        <div>
            <h4>Account Page: {authUser.email}</h4>
            {/* <div className="pw-forget">
                <p></p>
                <PasswordForgetForm />
            </div> */}
            <div className="pw-change">
                <h3>Change PassWord</h3>
                <PasswordChangeForm />
            </div>
        </div>
    )}
    </AuthUserContext.Consumer>
    )
}

//!!authUser means as long as its not null
// i.e. authUser => authUser != null
const condition = authUser => !!authUser

export default withAuthorization(condition)(AccountPage)