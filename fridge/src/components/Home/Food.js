import React, { Component } from "react"
import Checkbox from "./CheckboxComponent"
import { compose } from 'recompose';
import FinalCountdown from "./Moment"

import moment from 'moment';
import { withFirebase } from "../Firebase"
import { withAuthorization, AuthUserContext } from "../Session"

import Button from "react-bootstrap/button"
import Form from "react-bootstrap/form"

import checkboxes from "./checkboxes"

import _ from 'lodash';


const HomePage = () => (
    <React.Fragment>
        <h1>My Fridge</h1>
        <div className={"row"}>
            {/* <div className={"col-sm-12"}> */}
            <Foods />
            {/* </div> */}
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
            checkboxData: checkboxes,
            checkboxDataFruit: checkboxes.fruits,
            checkboxDataDairy: checkboxes.dairy,
            checkboxDataMeats: checkboxes.meats,
        }

        this.handleChange = this.handleChange.bind(this)

    }


    handleChange(id, authUser) {
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

            const updatedData2 = prevState.checkboxDataDairy.map(item => {
                if (item.key === id) {
                    item.checked = !item.checked
                }
                return item
            })
            return {
                checkboxDataDairy: updatedData2,
            }
        })
        this.setState(prevState => {

        const updatedData3 = prevState.checkboxDataMeats.map(item => {
            if (item.key === id) {
                item.checked = !item.checked
            }
            return item
        })
        return {
            checkboxDataMeats: updatedData3
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

        const daysFromNow = now.add(itemTime, 'd').add(6, 'h')
        // console.log(daysFromNow);

        // const updaysFromNow = daysFromNow.sort((a, b) => (a.color > b.color) ? 1 : -1)

        // this.setState({timeLeft:<FinalCountdown timeTillDate={daysFromNow} timeFormat="YYYY MM DD, HH:mm:ss"/>})


        return (

            <FinalCountdown timeTillDate={daysFromNow} timeFormat="YYYY MM DD, HH:mm:ss" />
        )
    }

    onChangeText = event => {
        this.setState({ text: event.target.value })
    }

    onChangeTime = event => {
        const immidiateTime = moment().format()

        const momentStr = immidiateTime
        this.setState({ time: event.target.value })
        this.setState({ moment: momentStr })
    }




    onCreateFoodItem = (event, authUser) => {

        this.props.firebase.food().push({
            text: this.state.text,
            userId: authUser.uid,
            time: this.state.time,
            moment: this.state.moment
        })

        this.setState({
            text: '',
            authUser: authUser.uid,
            time: '',
            moment: ''
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


                // const orderedList = foodList.sort((a, b) => (a.color > b.color) ? 1 : -1)


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
        console.log(uid)
        this.props.firebase.userFood(uid).remove();
    };

    componentWillUnmount() {
        this.props.firebase.food().off()
    }



    render() {
        const { text, food, loading, time } = this.state;

        return (

            <AuthUserContext.Consumer>
                {authUser => (
                    <React.Fragment>

                        {loading && <div>Loading...</div>}
                        {food ? (
                            <div className="foodList tbody col-sm-6">
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
                                                                    variant="danger"
                                                                    key={item.uid}
                                                                    type="button"
                                                                    onClick={() => this.onRemoveFood(item.uid)}
                                                                >X</Button>
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


                        <div>
                            <Button>FuckOFF</Button>
                            <Button>FuckOn</Button>

                        </div>
                        <div className="">
                            <form
                                className={"foodItemForm "}
                                name="foodForm"
                                onSubmit={event => this.onCreateFoodItem(event, authUser)}>

                                <Form.Group className="foodInputBox">
                                    <Form.Control
                                        name="food"
                                        placeholder="Food"
                                        type="text"
                                        value={text}
                                        onChange={this.onChangeText}
                                    // required={true}
                                    />
                                </Form.Group>
                                <Form.Group className="timeInputBox">
                                    <Form.Control
                                        name="time"
                                        placeholder="Time"
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
                            </div>

                            <form
                                className={"checkboxForm d-flex"}
                                name="checkboxform"
                                onSubmit={event => this.addToFoodDb(event, authUser)}>

                                {/* <div className={"fruits"}> */}
                                    {this.state.checkboxDataFruit.map(item => (
                                        <label className={"check-boxes"} key={item.key}>
                                            <pre>
                                                <Checkbox
                                                    key={item.key}
                                                    item={item}
                                                    className="check-boxes d-flex"
                                                    type="checkbox"
                                                    name={item.name}
                                                    value={item.value}
                                                    checked={item.checked}
                                                    handleChange={this.handleChange}>
                                                </ Checkbox>
                                                {item.name}
                                            </pre>
                                        </label>
                                    ))
                                    }
                                {/* </div> */}
                                {this.state.checkboxDataDairy.map(item => (
                                    <label key={item.key}>
                                        <pre>
                                            <Checkbox
                                                key={item.key}
                                                item={item}
                                                className="check-boxes d-flex"
                                                type="checkbox"
                                                name={item.name}
                                                value={item.value}
                                                checked={item.checked}
                                                handleChange={this.handleChange}>
                                            </ Checkbox>
                                            {item.name}

                                        </pre>
                                    </label>
                                ))
                                }
                                {this.state.checkboxDataMeats.map(item => (
                                    <label key={item.key}>
                                        <pre>
                                            <Checkbox
                                                key={item.key}
                                                item={item}
                                                className="check-boxes d-flex"
                                                type="checkbox"
                                                name={item.name}
                                                value={item.value}
                                                checked={item.checked}
                                                handleChange={this.handleChange}>
                                            </ Checkbox>
                                            {item.name}

                                        </pre>
                                    </label>
                                ))
                                }

                                <Button
                                    variant="outline-primary"
                                    type="submit"
                                >Add Items</Button>
                            </form>

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

