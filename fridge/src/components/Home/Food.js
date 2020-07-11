import React, { Component } from "react"
import { compose } from 'recompose';


import { withFirebase } from "../Firebase"
import { withAuthorization, AuthUserContext } from "../Session"
import * as ROLES from '../../constants/roles';



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
            loading: false,
            food: []
        }
    }

    onChangeText = event => {
        this.setState({ text: event.target.value });
    };

    onCreateFoodItem = (event, authUser) => {
        this.props.firebase.food().push({
            text: this.state.text,
            userId: authUser.uid,
        });

        this.setState({ text: '' });

        event.preventDefault();
    };

    componentDidMount() {
        this.setState({ loading: true })

        this.props.firebase.food().on("value", snapshot => {
            const foodObj = snapshot.val()

            if (foodObj) {

                const foodList = Object.keys(foodObj).map(key => ({
                    ...foodObj[key],
                    uid: key,
                }));

                this.setState({
                    food: foodList,
                    loading: false
                })
            } else {
                this.setState({ messages: null, loading: false })
            }
        })
    }

    componentWillUnmount() {
        this.props.firebase.food().off()
    }

    render() {
        const { text, food, loading } = this.state;

        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        {loading && <div>Loading...</div>}
                        {food ? (
                            <FoodList food={food} />
                        ) : (
                                <div>List is blank</div>
                            )}

                        <form onSubmit={event => this.onCreateFoodItem(event, authUser)}>
                            <input
                                type="text"
                                value={text}
                                onChange={this.onChangeText}
                            />
                            <button type="submit">Add Item</button>
                        </form>
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

const FoodList = ({ food }) => (
    <ul>
        {food.map(food => (
            <FoodItem key={food.uid} food={food} />
        ))}
    </ul>
)

const FoodItem = ({ food }) => (
    <li>
        <strong>{food.userId}</strong> {food.text}
    </li>
)



const Foods = withFirebase(FoodBase)
// const  Foods = withAuthorization(Foods1)

const condition = authUser => !!authUser;



  export default compose(
    withAuthorization(condition),
    withFirebase,
  )(HomePage);

// export default HomePage