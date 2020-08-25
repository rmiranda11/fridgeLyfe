import React, { useState } from "react"
import { AuthUserContext } from "../Session"
import SignInPage from "../SignIn/index"
import SignUpPage from "../SignUp/index"
import { PasswordForgetForm, PasswordForgetLink } from "../PasswordForget/index"

import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"

function LandingPage() {

    const [showDiv, setShowDiv] = useState(false)
    const [showDiv2, setShowDiv2] = useState(false)
    // const [showDiv3, setShowDiv3] = useState(false)
    const [showDiv4, setShowDiv4] = useState(false)
    const [door, setDoor] = useState(false)


function handleClick(){
    setShowDiv(!showDiv)
}

function handleClick2(){
    setShowDiv2(!showDiv)
}

function handleClick3(){
    setShowDiv2(true)
    setShowDiv(false)
}

function handleClick4(){
    setShowDiv(false)
    setShowDiv2(false)
    setShowDiv4(true)
}

function toggleDoor() {
    setDoor(!door)
}

const LandingAuth = ({ authUser }) => (
    <div className="landing-page row">

        <div className="fridge d-flex justify-content-center col-sm-6">
            <img className={door ? "doorOpen" : 'door'} onClick={toggleDoor} src="https://i.ibb.co/41LT43w/fridge.png" alt="fridge" border="0" />
            <div style={showDiv2 || showDiv || showDiv4 ? {display:"none"} : {display:"block"}} className="login">
                <Button variant="light" className="explore-btn center" size="lg" style={showDiv ? {display:"none"} : {display:"block"}} href="../home">Explore</Button>
            </div>
        </div>

        <div className="intro col-sm-6">
            <h1 className="title-landing">Fridge Lyfe</h1>
            <p className="intro-text">Divert from your old ways! Never throw out spoiled food again with Fridge Lyfe. 
            The newest App that tracks the life of your food from the moment you buy to the last recommended day of use. 
            </p>
        </div>
    </div>
)
const SignUpLink = () => (
    <div>
    <p className="center">
      Don't have an account?
    </p> 
    <Button className={"signup-btn-2"} variant={"light"} onClick={handleClick3}>Sign Up</Button>
</div>
  );

  const PasswordForgetLink = () => {
    return(
    <div className="center">
        <Button className="password-btn" variant={"light"}  onClick={handleClick4} >Forgot Password?</Button>
    </div>
    )
}

const LandingNonAuth = () => (
    <div className="landing-page row">

        <div className="fridge d-flex justify-content-center col-sm-6">
            <img className={door ? "doorOpen" : 'door'} onClick={toggleDoor} src="https://i.ibb.co/41LT43w/fridge.png" alt="fridge" border="0" />
            <div style={showDiv2 || showDiv || showDiv4 ? {display:"none"} : {display:"block"}} className="login">
            <Button variant="dark" className="login-btn" style={showDiv ? {display:"none"} : {display:"block"}} onClick={handleClick}>Sign In</Button>
            <Button variant="light" className="login-btn-2" style={showDiv2 ? {display:"none"} : {display:"block"}} onClick={handleClick2}>Sign Up</Button>
            </div>
            <div className="sign-in-div" style={showDiv ? {display:"block"} : {display:"none"}}><SignInPage /> <PasswordForgetLink /> <SignUpLink /></div>
            <div className="sign-up-div" style={showDiv2 ? {display:"block"} : {display:"none"}}><SignUpPage /></div>
            <div className="pw-forget-div" style={showDiv4 ? {display:"block"} : {display:"none"}}><PasswordForgetForm /></div>

        </div>

        <div className="intro col-sm-6">
            <h1 className="title-landing">Fridge Lyfe</h1>
            {/* <h4 className="sub-title"><q>Freshness makes the ❤️ last longer</q></h4> */}
            <p className="intro-text">Divert from your old ways! Never throw out spoiled food again with Fridge Lyfe. 
            The newest App that tracks the life of your food from the moment you buy to the last recommended day of use. 
            </p>
        </div>
    </div>
)



    return (


        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? (
                    <LandingAuth authUser={authUser} />
                ) : (
                        <LandingNonAuth />
                    )
            }
        </AuthUserContext.Consumer>
    )
}


export default LandingPage