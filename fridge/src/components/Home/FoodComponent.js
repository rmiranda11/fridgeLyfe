import React from "react"

function FoodComponent(props){
    const itemID = props.userId
    const userID = props.authUser.uid
    const foodItem = props.text
    if (itemID === userID) {

        return(

            <td>
                <h2 key={props.uid}>{foodItem}</h2>
            </td> 
        )
    }
}

// function NewFood(authUser) {
            
//     food.map(item => {
//         const itemID = item.userId
//         const userID = authUser.uid
//         const foodItem = item.text

//         if (itemID === userID) {
//             // console.log(foodItem)

//             return (
//                 <div>
//                     <h2 key={item.uid}>{foodItem}</h2>
//                 </div>
//             )

//             // const filtered = foodItem.filter(el => {
//             //      el !== null})
//             //     console.log(filtered)
//         }
//     })
// }

export default FoodComponent