import React from "react"

import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"

function LandingPage() {
    return(
        <div>
            {/* <Jumbotron style={{backgroundColor:"#57467b"}}>
                <h1 className="title d-flex justify-content-center">FridgeLyfe</h1>
                <h3 className="sub-title d-flex justify-content-center">Don't spoil your fucking food</h3>
                <div className="d-flex justify-content-center">
                <Button href="./signin" variant="light" >Sign In</Button>
                <Button href="./signup" variant="dark" >Sign Up</Button>
                </div>
            </Jumbotron> */}

            <div className="fridge d-flex justify-content-center">
            <a href="https://ibb.co/m0m7jxC"><img src="https://i.ibb.co/cwPdBmc/fridge.jpg" alt="fridge" border="0" /></a>
            </div>
        </div>
    )
}


export default LandingPage