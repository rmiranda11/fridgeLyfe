import React from "react"
import { useState, useEffect } from "react"

// import moment from 'react-moment';
import moment from 'moment';


function FinalCountdown(props) {

    const [days, setDays] = useState(undefined)
    const [hours, setHours] = useState(undefined)
    const [minutes, setMinutes] = useState(undefined)
    const [seconds, setSeconds] = useState(undefined)



    useEffect(() => {
        setInterval(() => {
            const { timeTillDate, timeFormat } = props
            // console.log(timeTillDate)
            const then = moment(timeTillDate, timeFormat).clone()
            // console.log(then)
            const now = moment().clone()
            // console.log(now)
            const countdown = moment(then - now)
            // console.log(countdown)
            const days = countdown.format('D');
            const hours = countdown.format('kk');
            // const minutes = countdown.format('mm');
            // const seconds = countdown.format('ss');
            setDays(days)
            setHours(hours)
            // setMinutes(minutes)
            // setSeconds(seconds)
        }, 1000)
    }, [])

    return (
        <div>
            <div className="countdown-wrapper">
                {days && (
                    <div className="countdown-item">
                        {days + " "}
                <span>{days  > 1 ? " days" : " day"  }</span>
                    </div>
                )}
                {/* {hours && (
                    <div className="countdown-item">
                        {hours}
                        <span>{hours > 1 ? "hours" : "hour"}</span>
                    </div>
                )} */}
                {/* {minutes && (
                    <div className="countdown-item">
                        {minutes}
                        <span>minutes</span>
                    </div>
                )}
                {seconds && (
                    <div className="countdown-item">
                        {seconds}
                        <span>seconds</span>
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default FinalCountdown