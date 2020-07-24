import React, { useState } from "react"
import { withFirebase } from "../Firebase"
import moment from 'moment';
import { withAuthorization, AuthUserContext } from "../Session"

import checkboxes from "./checkboxes"
import Checkbox from "./CheckboxComponent"




function PreSets(props) {

    // const foodArr = []
    // const [foodList, setFoodList] = useState([])
    // // const [moment, setMoment] = useState("")
    // console.log(foodList)

    const [checkedItems,setItems] = useState(new Map())

   function handleChange(event) {
        const item = event.target.name
        const isChecked = event.target.checked

        setItems(checkedItems.set(item, isChecked))
    }



    // function CheckboxList(event) {

    //     foodArr.push({
    //         name: event.target.name,
    //         value: event.target.value
    //     })
    //     console.log(foodArr);

    //     if(event){
    //         setFoodList(foodArr)

    //     }

    // }

    // console.log(foodList)

    //     // const now = moment().format()

    //     // const momentStr = now

    //     // setMoment(momentStr)
    

    // function HandleSubmit(event, authUser) {



    //     props.firebase.food().push({
    //         text: foodList.name,
    //         userId:authUser.uid,
    //         time: foodList.value,
    //         // moment: moment

    //     })

    //     event.preventDefault()
    // }

    return (
        <AuthUserContext.Consumer>
        {authUser => (
            <React.Fragment>
                {
                    checkboxes.map(item =>(
                        <label key={item.key}>
                            {item.name}
                            <Checkbox name={item.name} checked={checkedItems.get(item.name)} onChange={handleChange} /><br />                        </label>
                    ))
                }
            </React.Fragment>
                        )}
                        </AuthUserContext.Consumer>
    )
}

const Presets = withFirebase(PreSets)

export default withFirebase(Presets)

 