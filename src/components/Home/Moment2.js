import React from "react"
import { useState, useEffect } from "react"

// import moment from 'react-moment';
import moment from 'moment';


function FinalCountdown(props) {

    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    // const [minutes, setMinutes] = useState(undefined)
    // const [seconds, setSeconds] = useState(undefined)


    useEffect(() => {
        const Timer = setInterval(() => {
            const { timeTillDate, timeFormat } = props

            const then = moment(timeTillDate, timeFormat).clone()

            
            const now = moment().clone()

            const countdown = moment(then - now)


            const days = countdown.format('DDD')
            const hours = countdown.format('kk')
            // const minutes = countdown.format('mm');
            // const seconds = countdown.format('ss');
            
            setDays(days)
            setHours(hours)

            // setMinutes(minutes)
            // setSeconds(seconds)

            if(days && hours === 0){
                clearInterval(Timer)
            }
        }, 1000)
    }, [])

            const BLOCK = {diplay: 'block'}
            const NONE= {diplay: 'none'}
            const RED = {color:"red"}
            const ORANGE = {color:"orange"}
            const GREEN = {color:"green"}


    return (
        <div>
            <div className="countdown-wrapper"
                  style={days < 3 ? RED : days < 6 ? ORANGE : GREEN}
>
                {days && (
                    <div 
                    className="countdown-item"
                    style={days < 3 ? RED : days < 6 ? ORANGE : GREEN}
                    >
                        {days < 1 ? "": days} 
                        
                            {/* <span>{}</span> */}
                    </div>
                )}
                {hours && (
                    <div className="countdown-item-hour"
                    >
                        {hours > 0 ? hours : "" }
                        <span>{hours > 1 ? " hours" : hours && days < 1 ? "Expired" : " hour"}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FinalCountdown