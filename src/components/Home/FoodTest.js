import React, { Component } from "react"
import Checkboxes from "./CheckboxComponent"
import { compose } from 'recompose';
// import FinalCountdown from "./Moment"

import moment from 'moment';
import { withFirebase } from "../Firebase"
import { withAuthorization, AuthUserContext } from "../Session"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"

import checkboxes from "./checkboxes"
import Facts from "./Facts"

import _ from 'lodash';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Collapsible from 'react-collapsible';

// import Checkbox from '@material-ui/core/Checkbox';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import Countdown from "react-countdown";
// import { withTheme } from "@material-ui/core";


// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const HomePage = () => (
    <React.Fragment>
        <h2 className="title center margin">My Fridge</h2>
        <div className={"row"}>
            <div className="col-sm-12">
            <Foods />
            </div>
        </div>
    </React.Fragment>
)

class FoodBase extends Component {
    constructor(props) {
        super(props)


        this.state = {
            text: '',
            time: '',
            loading: false,
            food: [],
            authUser: '',
            foodKey: '',
            moment: '',
            checkboxDataFruit: checkboxes.fruits,
            checkboxDataVeggies: checkboxes.veggies,
            checkboxDataDairy: checkboxes.dairy,
            checkboxDataMeats: checkboxes.meats,
            timeLeft: '',
            toggle:false,
            search:""
        }

        FoodBase.contextType = AuthUserContext
        let context = AuthUserContext

        this.handleChange = this.handleChange.bind(this)
        this.onChangeTime = this.onChangeTime.bind(this)
        this.handleShow= this.handleShow.bind(this)
        this.handleHide= this.handleHide.bind(this)

    }

    handleShow(){
        this.setState({toggle : true})
    }
    handleHide(){
        this.setState({toggle : false})
    }


    handleChange(id) {

        this.setState(prevState => {
            const updatedData = prevState.checkboxDataFruit.map(item => {
                if (item.key === id) {
                    item.checked = !item.checked
                }
                return item
            })
            return {
                checkboxDataFruit: updatedData
            }
        })
        this.setState(prevState => {
            const updatedData = prevState.checkboxDataVeggies.map(item => {
                if (item.key === id) {
                    item.checked = !item.checked
                }
                return item
            })
            return {
                checkboxDataVeggies: updatedData
            }
        })
        this.setState(prevState => {

            const updatedData = prevState.checkboxDataDairy.map(item => {
                if (item.key === id) {
                    item.checked = !item.checked
                }
                return item
            })
            return {
                checkboxDataDairy: updatedData,
            }
        })
        this.setState(prevState => {

            const updatedData = prevState.checkboxDataMeats.map(item => {
                if (item.key === id) {
                    item.checked = !item.checked
                }
                return item
            })
            return {
                checkboxDataMeats: updatedData
            }
        })

    }

    addToFoodDb = (event, authUser) => {

        const immediateTime = moment().format()
        const momentStr = immediateTime
        this.setState({ moment: momentStr })

        this.state.checkboxDataFruit.forEach(e =>

            e.checked ?
                this.props.firebase.userFood(authUser.uid).push({
                    text: e.name,
                    userId: authUser.uid,
                    time: e.value,
                    moment: Date.now()
                })
                :
                null
        )
        this.state.checkboxDataVeggies.forEach(e =>

            e.checked ?
                this.props.firebase.userFood(authUser.uid).push({
                    text: e.name,
                    userId: authUser.uid,
                    time: e.value,
                    moment: Date.now()
                })
                :
                null
        )

        this.state.checkboxDataDairy.forEach(e =>

            e.checked ?
                this.props.firebase.userFood(authUser.uid).push({
                    text: e.name,
                    userId: authUser.uid,
                    time: e.value,
                    moment: Date.now()
                })
                :
                null
        )

        this.state.checkboxDataMeats.forEach(e =>

            e.checked ?
                this.props.firebase.userFood(authUser.uid).push({
                    text: e.name,
                    userId: authUser.uid,
                    time: e.value,
                    moment: Date.now()
                })
                :
                null
        )


        event.preventDefault()
    }

    Timer = (itemTime, moment) => {
        const RED = {color:"red"}
        const ORANGE = {color:"orange"}
        const GREEN = {color:"green"}
        const renderer = ({ days,hours, minutes, seconds, completed }) => {
            if (completed) {
              // Render a complete state
              return <p className="expired">EXPIRED</p>
            } else {
              // Render a countdown
              return (
                <p 
                className="countdown-wrapper"
                style={days < 3 ? RED : days < 6 ? ORANGE : GREEN}
                >
                  {days === 0 ? "" : days}{days > 1 ? " days" : days === 0 ? "" : " day"} {hours === 0 ? "< 1": hours}{hours > 1 ? " hours" : " hour"}
                </p>
              );
            }
          };
        const modTime = itemTime * 86400000
        // const modTime = itemTime * 3600000 
        //   console.log(modTime)
        return(
        <Countdown date={moment + modTime} renderer={renderer}/>
        )
    }

 
    onChangeText = event => {
        this.setState({ text: event.target.value })

    }

    onChangeTime = event => {

        this.setState({ time: event.target.value })
        this.setState({ moment: Date.now() })

    }

    // Pushes a new food item to db using state
    onCreateFoodItem = (event, authUser) => {
        
        this.props.firebase.userFood(authUser.uid).push({
            text: this.state.text,
            userId: authUser.uid,
            time: this.state.time,
            moment: this.state.moment,
            timeLeft: this.state.timeLeft
        })

        this.setState({
            text: '',
            authUser: authUser.uid,
            time: '',
            moment: '',
            timeLeft: ''
        })



        event.preventDefault();
    }


    componentDidMount() {   

        console.log(this.context)
        this.setState({ loading: true })

        
        this.props.firebase.userFood(this.context.uid).on("value", snapshot => {
            const foodObj = snapshot.val()
            if (foodObj) {

                const foodList = Object.keys(foodObj).map(key => ({
                    ...foodObj[key],
                    uid: key,
                }));


                foodList.map(item => {
                    const moment = item.moment
                    const time = item.time
                    const uTime = this.Timer(item,moment)

                    const modTime = time * 86400000
                    const newMoment = modTime + moment
                    const difference = newMoment - Date.now() 
                    const d = difference/86400000
                    
                    item.timeLeft = d
                })


                this.setState({
                    food: foodList,
                    loading: false
                })


            } else {
                this.setState({ food: null, loading: false })
            }
        })



    }

    onSearch = (text) => {
        const str = text.replace(/\s/g, '');
        const search = 'https://www.allrecipes.com/search/results/?wt='+str+'&sort=re'

        return(
            search
        )
    
    }

    onRemoveFood = uid => {
        this.props.firebase.userFood2(uid,this.context.uid).remove();
    };

    componentWillUnmount() {
        this.props.firebase.food().off()
    }



    render() {

        const { text, food, loading, time } = this.state;

        const tabStyle = {
            backgroundColor: "teal",
            fontSize:"1rem",   
            margin:".2 .5rem",
            border:"solid white 2",
            color:"white",                
        }

        const tabStyle2 = {
            backgroundColor: "sandybrown",
            fontSize:"1rem",   
            margin:".2 .5rem",
            border:"solid white 2",
            color:"white",

        }
        const tabStyle3 = {
            backgroundColor: "darkslategrey",
            fontSize:"1rem",   
            margin:".2 .5rem",
            border:"solid white 2",
            color:"white",
            // width:"13rem"                
        }


        function FoodCollapse(foodName,direction){
            const up = <KeyboardArrowUpIcon className="up-icon"/>
            const down = <KeyboardArrowDownIcon className="down-icon"/>
            return(

                <div className="food-title"><h4>{foodName}</h4>{direction === "up" ? up : down}</div>
            )
        }


        return (

            <AuthUserContext.Consumer>
                {authUser => (
                    <React.Fragment>``
                        
                        {loading ? <div className="title center">Loading...</div> : 
                            <div className="row">
                                <Tabs className="col-sm-8">
                                    <TabList className="tab-list">
                                        <Tab style={tabStyle}>My Fridge</Tab>
                                        <Tab style={tabStyle2}>Add Food</Tab>
                                        <Tab style={tabStyle3}>Quick Add</Tab>
                                    </TabList>
                                    <div className="tabs">

                            <TabPanel className="food-list">
                                {food ? (

                                    <div className="foodList tbody col-sm-12">
                                        <Table striped bordered hover size="sm" className="table" responsive="sm">

                                            <thead>
                                                <tr className="item-text2">
                                                    <th className="item-text">Items</th>
                                                    <th className="item-text">Time Left</th>
                                                    <th className="item-text">🗑️</th>
                                                    <th className="item-text book">📕</th>
                                                </tr>
                                                
                                            </thead>
                                            {

                                                // part where days get sorted
                                                _.sortBy(food, ["timeLeft"]).map(item => {
                                                    const itemID = item.userId
                                                    const userID = authUser.uid
                                                    const foodItem = item.text
                                                    const itemTime = item.time
                                                    const moment = item.moment
                                                    
                                                    console.log(authUser)
                                                    const MixedComponent = () => (
                                                        <tr>
                                                            <td className="food-item">
                                                                {foodItem}
                                                            </td>
                                                            <td>
                                                                {/* {this.TimeMatch(itemTime, moment)} */}
                                                                {this.Timer(itemTime,moment)}
                                                            </td>
                                                            <td>
                                                                <Button
                                                                className={"x-button"}
                                                                variant="light"
                                                                key={item.uid}
                                                                type="button"
                                                                onClick={() => this.onRemoveFood(item.uid)}
                                                                >&#10060;</Button>
                                                            </td>
                                                            <td>
                                                                <Button
                                                                className={"search-button"}
                                                                variant="light"
                                                                key={item.uid}
                                                                type="button"
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                href={this.onSearch(item.text)}
                                                                onClick={() => this.onSearch(item.text)}
                                                                >&#128269;</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                            
                                
                                                    if (itemID === userID) {

                                                        return (
                                                            <tbody key={item.uid}>
                                                                <MixedComponent/>
                                                            </tbody>
                                                        )
                                                    }
                                                })

                                            }

                                        </Table>
                                    </div>
                                ) : (
                                        <h3 className="no-food">Add food items here 👆</h3>
                                    )}
                            </TabPanel>
                            <TabPanel>


                                <div className="food-item-form" id="foodForm">
                                    <h2 className="sub-title quick-select">Create Your Own</h2>
                                    <p className="create-text">Create your own item to add to your Fridge. Add any odds and ends or even leftovers. Be sure to follow the <a href="https://www.fsis.usda.gov/wps/portal/fsis/topics/food-safety-education/get-answers/food-safety-fact-sheets/safe-food-handling/leftovers-and-food-safety/ct_index">USDA</a>on recommended shelf life of both uncooked and cooked food.</p>
                                    <form
                                        className={"foodItemForm"}
                                        name="foodForm"
                                        onSubmit={event => this.onCreateFoodItem(event, authUser)}>

                                        <Form.Group className="foodInputBox">
                                            <Form.Control
                                                name="food"
                                                placeholder="Food Name"
                                                type="text"
                                                value={text}
                                                onChange={this.onChangeText}
                                            />
                                        </Form.Group>
                                        <Form.Group className="timeInputBox">
                                            <Form.Control
                                                name="time"
                                                placeholder="Days until Expiration"
                                                type="number"
                                                value={time}
                                                onChange={this.onChangeTime}
                              
                                            />

                                        </Form.Group>
                                <Modal show={this.state.toggle} onHide={this.handleHide}>
                                    
                                    <Modal.Header closeButton>
                                    <Modal.Title className="sub-title">Item added to My Fridge</Modal.Title>
                                    </Modal.Header>
                                    {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleHide}>
                                        Close
                                    </Button>
                                    </Modal.Footer>
                                </Modal>

                                        <Button
                                            className="foodItemBtn"
                                            variant="primary"
                                            type="submit"
                                            onClick={this.handleShow}
                                            style={{backgroundColor:"teal"}}
                                        >Add Item</Button><br /><br />

                                    </form>
                                </div>                                
                            </TabPanel>
                            <TabPanel>
                                        <form
                                            className={"checkboxForm"}
                                            id="checkboxForm"
                                            name="checkboxform"
                                            onSubmit={event => this.addToFoodDb(event, authUser)}>

                                            <h2 className="sub-title quick-select2 center">Quick Select</h2>
                                            <p className="quick-select-text">Went Grocery Shopping? Add multiple items all at once with the form below. All recommeded expiration times made by your fellow <a href="https://www.fsis.usda.gov/wps/portal/fsis/topics/food-safety-education/get-answers/food-safety-fact-sheets/safe-food-handling">USDA</a></p>

                                            <div className="check-container row">

                                            <Collapsible trigger={FoodCollapse("Fruit","down")} triggerWhenOpen={FoodCollapse("Fruit", "up")}>
                                            {this.state.checkboxDataFruit.map(item => (
                                                <label
                                                    key={item.key}>      

                                                    <div className={"checks"}>
                                                        <Checkboxes
                                                            key={item.key}
                                                            item={item}
                                                            className="check-boxes"
                                                            type="checkbox"
                                                            name={item.name}
                                                            value={item.value}
                                                            checked={item.checked}
                                                            handleChange={this.handleChange}>
                                                        </ Checkboxes>

                                                        {item.name}

                                                    </div>

                                                </label>
                                            ))
                                            }
                                                    </Collapsible>

                                            <Collapsible trigger={FoodCollapse("Veggies","down")} triggerWhenOpen={FoodCollapse("Veggies", "up")}>
                                            {this.state.checkboxDataVeggies.map(item => (
                                                <label
                                                    key={item.key}>
                                                    <div className={"checks"}>
                                                        <Checkboxes
                                                            key={item.key}
                                                            item={item}
                                                            className="check-boxes"
                                                            type="checkbox"
                                                            name={item.name}
                                                            value={item.value}
                                                            checked={item.checked}
                                                            handleChange={this.handleChange}>                                                {item.name}

                                                        </ Checkboxes>
                                                        {item.name}
                                                    </div>
                                                </label>
                                            ))
                                            }
                                            </Collapsible>

                                            <Collapsible trigger={FoodCollapse("Dairy","down")} triggerWhenOpen={FoodCollapse("Dairy", "up")}>
                                            {this.state.checkboxDataDairy.map(item => (
                                                <label key={item.key}>
                                                    <div className={"checks"}>

                                                        <Checkboxes
                                                            key={item.key}
                                                            item={item}
                                                            className="check-boxes"
                                                            type="checkbox"
                                                            name={item.name}
                                                            value={item.value}
                                                            checked={item.checked}
                                                            handleChange={this.handleChange}>
                                                        </ Checkboxes>
                                                        {item.name}
                                                    </div>

                                                </label>
                                            ))
                                            }
                                              </Collapsible>

                                              <Collapsible trigger={FoodCollapse("Meats","down")} triggerWhenOpen={FoodCollapse("Meats", "up")}>
                                            {this.state.checkboxDataMeats.map(item => (
                                                <label key={item.key}>
                                                    <div className={"checks"}>
                                                        <Checkboxes
                                                            key={item.key}
                                                            item={item}
                                                            className="check-boxes d-flex"
                                                            type="checkbox"
                                                            name={item.name}
                                                            value={item.value}
                                                            checked={item.checked}
                                                            handleChange={this.handleChange}>
                                                        </ Checkboxes>
                                                        {item.name}

                                                    </div>
                                                </label>
                                            ))
                                            }
                                          </Collapsible>
                                          </div>

                                        <Modal show={this.state.toggle} onHide={this.handleHide}>
                                    
                                            <Modal.Header closeButton>
                                            <Modal.Title className="sub-title">Items added to My Fridge</Modal.Title>
                                            </Modal.Header>
                                            {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleHide}>
                                                Close
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>

                                            <br />
                                            <Button
                                                className="check-btn"
                                                onClick={this.handleShow}
                                                variant="primary"
                                                type="submit"
                                                style={{backgroundColor:"teal"}}
                                            >Add Items</Button>
                                        </form></TabPanel>
                                        </div>
                                </Tabs>
                                <div className="col-sm-4">
                                <Facts />
                                {/* <br/><br/> */}
                                {/* <img className="img" src="https://images-na.ssl-images-amazon.com/images/I/71dUhdX-bFL._AC_SX425_.jpg"></img>                         */}
                                </div>
                            </div>
                        }

                    </React.Fragment>
                )}
            </AuthUserContext.Consumer>
        )
    }
}




const Foods = withFirebase(FoodBase)

const condition = authUser => !!authUser;


export default compose(
    withAuthorization(condition),
    withFirebase,
)(HomePage);

