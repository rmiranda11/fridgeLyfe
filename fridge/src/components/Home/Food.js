import React, { Component } from "react"
import Checkbox from "./CheckboxComponent"
import { compose } from 'recompose';
import FinalCountdown from "./Moment"

import moment from 'moment';
import { withFirebase } from "../Firebase"
import { withAuthorization, AuthUserContext } from "../Session"
import * as ROLES from '../../constants/roles';

import Presets from "./PreSets"

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
            moment: '',
        }

    }


    TimeMatch = (itemTime, moments) => {
        const now = moment(moments, "YYYY MM DD, HH:mm:ss")
        console.log(now);
        const daysFromNow = now.add(itemTime - 1, 'd').add(6, 'h')


        return (

            <FinalCountdown timeTillDate={daysFromNow} timeFormat="YYYY MM DD, HH:mm:ss" />

        )
    }

    onChangeText = event => {
        this.setState({ text: event.target.value })
    }

    onChangeTime = event => {
        const now = moment().format()

        const momentStr = now
        this.setState({ time: event.target.value })
        this.setState({ moment: momentStr })
    }

    // onFillPresets = event => {
    //     this.setState({ presets: event.target.value })
    //     console.log(event)
    // }

    // addToFoodDb = (event) => {
    //     this.props.firebase.food().push({

    //     })
    // }

    // handleCheckbox = event => {
    //     const {name, value, type, checked} = event.target
    //     const checkObj = {
    //         [name]:checked
    //     }

    //     console.log(checkObj);
    // }

    // handleChange = (event) =>{
    //     const {name, value, type, checked} = event.target
    //     this.setState({
    //         [name]: value
    //     }) 
    // }

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
                    
                        {/* <FinalCountdown timeTillDate="07 18 2020, 6:00 am" timeFormat="MM DD YYYY, h:mm a" /> */}
                        {loading && <div>Loading...</div>}
                        {food ? (
                            <div>
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
                                        console.log(moment)
                                        const FoodItem = () => (
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
                                                                
                                                            >
                                                                Delete
                                                            </button>
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

                        <Presets />

                    </React.Fragment>
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

