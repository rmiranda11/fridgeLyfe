import React from "react"
import Food from "./Food"

import { withAuthorization } from "../Session"

function HomePage() {
    return(
        <div>
            <h1>
                {/* <Food /> */}
            </h1>
        </div>
    )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(HomePage)