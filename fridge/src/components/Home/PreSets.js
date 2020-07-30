import React, { useState } from "react"
import { withFirebase } from "../Firebase"
import moment from 'moment';
import { withAuthorization, AuthUserContext } from "../Session"

import checkboxes from "./checkboxes"
import Checkbox from "./CheckboxComponent"

import Button from "react-bootstrap/button"
import Form from "react-bootstrap/form"


class PreSets extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            checkedItems: new Map(),
        }

        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(e) {
        console.log(e.target)
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
      }


      render(){
        return (
            <AuthUserContext.Consumer>
            {authUser => (
                <React.Fragment>
                    {
                        checkboxes.map(item =>(
                            <label key={item.key} className="" >
                                <pre><Checkbox className="check-boxes" type={"checkbox"} name={item.name} value={item.value} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange}> </ Checkbox>
                                 {item.name}</pre>
                            </label>
                        ))

                        
                    }
                </React.Fragment>
            )}
            </AuthUserContext.Consumer>
        )
                }



}

const Presets = withFirebase(PreSets)

export default withFirebase(Presets)

 



// function PreSets(props) {

//     // const foodArr = []
//     // const [foodList, setFoodList] = useState([])
//     // // const [moment, setMoment] = useState("")
//     // console.log(foodList)

//     const [checkedItems,setItems] = useState(new Map())





//     // function CheckboxList(event) {

//     //     foodArr.push({
//     //         name: event.target.name,
//     //         value: event.target.value
//     //     })
//     //     console.log(foodArr);

//     //     if(event){
//     //         setFoodList(foodArr)

//     //     }

//     // }

//     // console.log(foodList)

//     //     // const now = moment().format()

//     //     // const momentStr = now

//     //     // setMoment(momentStr)
    

//     // function HandleSubmit(event, authUser) {



//     //     props.firebase.food().push({
//     //         text: foodList.name,
//     //         userId:authUser.uid,
//     //         time: foodList.value,
//     //         // moment: moment

//     //     })

//     //     event.preventDefault()
//     // }
   