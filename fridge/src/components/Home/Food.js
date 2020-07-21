import React, { Component } from "react"
import FoodComponent from "./FoodComponent"
import { compose } from 'recompose';
import FinalCountdown from "./Moment"

import moment from 'moment';
import { withFirebase } from "../Firebase"
import { withAuthorization, AuthUserContext } from "../Session"
import * as ROLES from '../../constants/roles';

import Moment from 'react-moment';


const HomePage = () => (
    <div>
        <h1>Food List</h1>
        <Foods />
    </div>

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
            moment: ''
        }

        this.TimeMatch = this.TimeMatch.bind(this)
    }

    // 1. Subtract Time Stamp from todays date


    TimeMatch = (time, moments) => {
        const now = moment(moments, "D, HH:mm")

        const daysFromNow = now.clone().add(time - 1, 'd')
        console.log(daysFromNow)


        return (

            <FinalCountdown timeTillDate={daysFromNow} timeFormat="D, HH:mm a" />

        )
    }



    onChangeText = event => {
        this.setState({ text: event.target.value })
    }

    onChangeTime = event => {
        const now = moment()
        const nowString = JSON.stringify(now)
        console.log(nowString)

        const momentStr = nowString
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

    componentWillUnmount() {
        this.props.firebase.food().off()
    }

    onRemoveFood = uid => {
        console.log("clicked")
        this.props.firebase.food(uid).remove();
      };

    render() {
        const { text, food, loading, time } = this.state;


        return (

            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        {/* <FinalCountdown timeTillDate="07 18 2020, 6:00 am" timeFormat="MM DD YYYY, h:mm a" /> */}
                        {loading && <div>Loading...</div>}
                        {food ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Items</th>
                                        <th>Time Left</th>
                                    </tr>
                                </thead>
                                {
                                    food.map(item => {
                                        const itemID = item.userId
                                        const userID = authUser.uid
                                        const foodItem = item.text
                                        const itemTime = item.time
                                        const moment = item.moment
                                        console.log(item.uid)

                                        const FoodItem = (onRemoveFood) => (
                                            <td>
                                                {foodItem}
                                            </td>
                   
                                        )

                                        if (itemID === userID) {

                                            return (
                                                <tbody key={item.uid}>

                                                    <tr key={item.uid}>
                                                        <FoodItem
                                                            key={item.uid}
                                                            food={item}
                                                            onRemoveFood={this.onRemoveFood}

                                                        />
                                                        <td>{this.TimeMatch(itemTime, moment)}</td>
                                                        <td>

                                                            <button
                                                                type="button"
                                                                onClick={() => this.onRemoveFood(item.uid)}
                                                            >
                                                                Delete
                                                            </button></td>
                                                    </tr>
                                                </tbody>

                                            )
                                        }   
                                    })
                                }

                            </table>

                        ) : (
                                <div>List is blank</div>
                            )}


                        <form
                            name="foodForm"
                            onSubmit={event => this.onCreateFoodItem(event, authUser)}>
                            <input
                                name="food"
                                placeholder="Food"
                                type="text"
                                value={text}
                                onChange={this.onChangeText}
                                required={true}
                            />
                            <br />
                            <input
                                name="time"
                                placeholder="Time"
                                type="text"
                                value={time}
                                onChange={this.onChangeTime}
                                required={true}
                            />
                            <button type="submit">Add Item</button>
                        </form>
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

// const Validate = (foodForm) => {
//     if(foodForm.food.value === "" || foodForm.time.value === ""){
//         return false
//     }else{
//         return 
//     }
// }



// const UpdatedFood = ({ food }, { authUser }) => (
//     <td>
//         {food.map(item => (
//             <FoodItem key={item.uid} food={item} />


//         ))}
//     </td>
// )

// const FoodList = ({ food }) => (
//     <ul>
//         {food.map(food => (
//             <FoodItem key={food.uid} food={food} />
//         ))}
//     </ul>

// )

// const FoodItem = ({ food }) => (
//     <td>
//         <strong>{food.text}</strong>
//     </td>
// )






const Foods = withFirebase(FoodBase)

const condition = authUser => !!authUser;


export default compose(
    withAuthorization(condition),
    withFirebase,
)(HomePage);

