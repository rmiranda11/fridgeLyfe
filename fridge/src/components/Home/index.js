import React from "react"

import { withAuthorization } from "../Session"

function HomePage() {
    return(
        <div>
            <h1>
                This is the Home page is viewed only by the greatest
            </h1>
        </div>
    )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(HomePage)