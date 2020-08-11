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

// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const HomePage = () => (
    <React.Fragment>
        <h1>My Fridge</h1>
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
                    moment: momentStr
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
                    moment: momentStr
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
                    moment: momentStr
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
                    moment: momentStr
                })
                :
                null
        )

        event.preventDefault()
    }


    TimeMatch = (itemTime, moments) => {

        const now = moment(moments, "YYYY MM DD, HH:mm:ss")
        // console.log(now)

        const daysFromNow = now.add(itemTime, 'd').add(6, 'h')

        // console.log(now.to(daysFromNow))

        return (
            <FinalCountdown timeTillDate={daysFromNow} timeFormat="YYYY MM DDD, HH:mm:ss" />
        )
    }

    onChangeText = event => {
        this.setState({ text: event.target.value })
    }

    onChangeTime = event => {

        const immediateTime = moment().format()

        const momentStr = immediateTime

        this.setState({ time: event.target.value })
        this.setState({ moment: momentStr })
        this.setState({ timeLeft: 6 })

        console.log(JSON.stringify(this.TimeMatch(this.state.time, immediateTime)))
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

                this.setState({
                    food: foodList,
                    loading: false
                })


            } else {
                this.setState({ food: null, loading: false })
            }
        })

    }

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

        return (

            <AuthUserContext.Consumer>
                {authUser => (
                    <React.Fragment>
                        
                        {loading && <div>Loading...</div>}
                        {
                                <Tabs >
                                    <TabList >
                                    <div className="tab-list">
                                        <Tab>My Fridge</Tab>
                                        <Tab>Add Food</Tab>
                                        <Tab>Quick Add</Tab>
                                        </div>
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
                                                        _.sortBy(food, ["time"]).map(item => {
                                                            const itemID = item.userId
                                                            const userID = authUser.uid
                                                            const foodItem = item.text
                                                            const itemTime = item.time
                                                            const moment = item.moment


                                                            const FoodItem = () => (
                                                                <td
                                                                    className={"tbody"}
                                                                >
                                                                    {foodItem}
                                                                </td>

                                                            )

                                                            if (itemID === userID) {

                                                                return (
                                                                    <tbody
                                                                        key={item.uid}
                                                                        timeleft={this.TimeMatch(itemTime, moment)}>

                                                                        <tr key={item.uid}>
                                                                            <FoodItem
                                                                                key={item.uid}
                                                                                food={item}
                                                                                onRemoveFood={this.onRemoveFood}

                                                                            />
                                                                            <td>{this.TimeMatch(itemTime, moment)}</td>
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

                                            <h2>Quick Select</h2>
                                            <h4>Fruit</h4>
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

