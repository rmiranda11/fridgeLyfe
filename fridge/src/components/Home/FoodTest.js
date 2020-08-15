import React, { Component } from "react"
import Checkboxes from "./CheckboxComponent"
import { compose } from 'recompose';
// import FinalCountdown from "./Moment"

import moment from 'moment';
import { withFirebase } from "../Firebase"
import { withAuthorization, AuthUserContext } from "../Session"

import Button from "react-bootstrap/button"
import Form from "react-bootstrap/form"

import checkboxes from "./checkboxes"

import _ from 'lodash';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import FinalCountdown from "./Moment2"
import Countdown from "react-countdown";
import { withTheme } from "@material-ui/core";


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
        }

        this.handleChange = this.handleChange.bind(this)
        this.onChangeTime = this.onChangeTime.bind(this)

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
                this.props.firebase.food().push({
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
                this.props.firebase.food().push({
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
                this.props.firebase.food().push({
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
                this.props.firebase.food().push({
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
                <span 
                className="countdown-wrapper"
                style={days < 3 ? RED : days < 6 ? ORANGE : GREEN}
                >
                  {days}:{hours}:{minutes}:{seconds}
                </span>
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

        const immediateTime = moment().format()

        const momentStr = immediateTime

        this.setState({ time: event.target.value })
        // this.setState({ moment: momentStr })
        this.setState({ moment: Date.now() })

    }

    // Pushes a new food item to db using state
    onCreateFoodItem = (event, authUser) => {

        this.props.firebase.food().push({
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

        
        this.setState({ loading: true })


        this.props.firebase.food().on("value", snapshot => {
            const foodObj = snapshot.val()
            if (foodObj) {

                const foodList = Object.keys(foodObj).map(key => ({
                    ...foodObj[key],
                    uid: key,
                }));

                console.log(foodList)

                foodList.map(item => {
                    const moment = item.moment
                    const time = item.time
                    const uTime = this.Timer(item,moment)
        
                    const modTime = time * 86400000
                    const newMoment = modTime + moment
                    const difference = newMoment -Date.now() 
                    const d = difference/86400000
                    console.log(item.text)
                    console.log(d)
                    
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

    // componentDidMount(){
    //     this.state.food.map(item)
    // }

    onRemoveFood = uid => {
        // console.log(uid)
        this.props.firebase.userFood(uid).remove();
    };

    componentWillUnmount() {
        this.props.firebase.food().off()
    }



    render() {
        const { text, food, loading, time, timeLeft } = this.state;
        console.log(food)

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
        }


        return (

            <AuthUserContext.Consumer>
                {authUser => (
                    <React.Fragment>
                        
                        {loading && <div className="title">Loading...</div>}
                        {
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
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Items</th>
                                                    <th className={"countdown-wrapper"}>Time Left</th>
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
                                                    
                                                    // console.log(foodItem)
                                                    // console.log(moment / 3600000)
                                                    // console.log(Date.now())
                                                    // const D = (Date.now() - moment)
                                                    // console.log(D)
                                                    // console.log(Math.round(D / 3600000))

                                                    
                                                    const MixedComponent = () => (
                                                        <tr 
                                                        // value={this.TimeMatch(itemTime, moment)}
                                                        >
                                                            <td>
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
                                                        </tr>
                                                    )
                                            
                                                    const FoodItem = () => (
                                                        <td
                                                            className={"tbody"}>
                                                            {foodItem}
                                                        </td>

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

                                        </table>
                                    </div>
                                ) : (
                                        <div>List is blank</div>
                                    )}
                            </TabPanel>
                            <TabPanel>


                                <div className="food-item-form" id="foodForm">
                                    <form
                                        className={"foodItemForm "}
                                        name="foodForm"
                                        onSubmit={event => this.onCreateFoodItem(event, authUser)}>

                                        <Form.Group className="foodInputBox">
                                            <Form.Control
                                                name="food"
                                                placeholder="Food Name"
                                                type="text"
                                                value={text}
                                                onChange={this.onChangeText}
                                            // required={true}
                                            />
                                        </Form.Group>
                                        <Form.Group className="timeInputBox">
                                            <Form.Control
                                                name="time"
                                                placeholder="Days until Expiration"
                                                type="text"
                                                value={time}
                                                onChange={this.onChangeTime}
                                            //   required={true}
                                            //   disabled={time === 1 ? true : false}
                                            />

                                        </Form.Group>
                                        {/* <p>{time < 1 ? "Time entered cannot be less than 1" : null}</p> */}

                                        <Button
                                            className="foodItemBtn"
                                            variant="outline-primary"
                                            type="submit"
                                        // disabled={time < 1}
                                        >Add Item</Button><br /><br />

                                    </form>
                                </div>                                </TabPanel>
                            <TabPanel>
                                        <form
                                            className={"checkboxForm"}
                                            id="checkboxForm"
                                            name="checkboxform"
                                            onSubmit={event => this.addToFoodDb(event, authUser)}>

                                            <h2 className="sub-title">Quick Select</h2>
                                            <h4 className="">Fruit</h4>
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
                                            <h4>Veggies</h4>
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
                                            <h4>Dairy</h4>
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
                                            <h4>Meats</h4>
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
                                            <br />
                                            <Button
                                                variant="outline-primary"
                                                type="submit"
                                            >Add Items</Button>
                                        </form></TabPanel>
                                        </div>

                                </Tabs>
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

