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
            const then = moment(timeTillDate, timeFormat).clone()
            const now = moment().clone()
            const countdown = moment(then - now)
            const days = countdown.format('D');
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');
            setDays(days)
            setHours(hours)
            setMinutes(minutes)
            setSeconds(seconds)
        }, 1000)
    }, [])

    return (
        <div>
            <div className="countdown-wrapper">
                {days && (
                    <div className="countdown-item">
                        {days}
                <span>{days > 1 ? "days" : "day"  }</span>
                    </div>
                )}
                {hours && (
                    <div className="countdown-item">
                        {hours}
                        <span>hours</span>
                    </div>
                )}
                {minutes && (
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
                )}
            </div>
        </div>
    )
}

export default FinalCountdown