import React, { Component } from "react"
import FoodComponent from "./FoodComponent"
import { compose } from 'recompose';


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
            foodKey: ''
        }
    }

    // ReadData = (authUser) => {
    //     this.props.firebase.userFood(authUser).on("value", snapshot => {
    //         const foodObj1 = snapshot.val()
    //         console.log(foodObj1)

    //     })
    // }

    onChangeText = event => {
        this.setState({ text: event.target.value });
    };

    onChangeTime = event => {
        this.setState({ time: event.target.value })
    }


    onCreateFoodItem = (event, authUser) => {
        // var itemId = this.props.firebase.food(authUser.uid).push().key;
        this.props.firebase.food().push({
            text: this.state.text,
            userId: authUser.uid,
            time: this.state.time
        });

        this.setState({
            text: '',
            authUser: authUser.uid,
            time:''
        });

        event.preventDefault();
    };



    componentDidMount() {

        this.setState({ loading: true })

        // this.props.firebase.food().on("value", snapshot => {


        this.props.firebase.food().on("value", snapshot => {
            const foodObj = snapshot.val()
            console.log(foodObj)
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
    x
    render() {
        const { text, food, loading, time } = this.state;

        const dateToFormat = '1976-04-19T12:59-0500';

        // food.map(item => {
        //     const itemID = item.userId
        //     const userID = authUser.uid
        //     const foodItem = item.text

        //     if (itemID === userID) {
        //         // console.log(foodItem)

        //         return (
        //             <div>
        //                 <h2 key={item.uid}>{foodItem}</h2>
        //             </div>
        //         )
        // })

        // const foodData = FoodComponent 
        // const updatedList = foodData.map(item => 
        //     <FoodComponent 
        //         key={item.userId}
        //     />)

        return (
            
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                                <Moment>{dateToFormat}</Moment>

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
                                                        />
                                                         <td>{itemTime}</td>
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


                        <form onSubmit={event => this.onCreateFoodItem(event, authUser)}>
                            <input
                                placeholder="Food"
                                type="text"
                                value={text}
                                onChange={this.onChangeText}
                            />
                            <br />
                            <input
                                placeholder="Time"
                                type="text"
                                value={time}
                                onChange={this.onChangeTime}
                            />
                            <button type="submit">Add Item</button>
                        </form>
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}



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
// const  Foods = withAuthorization(Foods1)

const condition = authUser => !!authUser;


export default compose(
    withAuthorization(condition),
    withFirebase,
)(HomePage);

// export default HomePage