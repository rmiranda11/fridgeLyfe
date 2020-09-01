import React, { useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import factsData from "./factsData"



const Facts = React.memo(function Facts() {

    const [facts] = useState(factsData);
    const [random, setRandom] = useState(facts[0])

    useEffect(() => {
        let mounted = true

        setInterval(() => {
            var randomFact = facts[Math.floor(Math.random() * facts.length)];
            setRandom(randomFact)
        }, 9000)

        return () => {mounted = false};

    },[])

  
    return (
        <Card style={{ width: '20rem', height:'auto', marginTop:"5.2rem"}} bg={random.color} className="card">
            <Card.Body>
                <Card.Title className="card-title">Random Facts!</Card.Title>
                <Card.Img variant="top" className="card-img" src={random.pic} /><br />
                <Card.Text className="fact">
                    {random.fact}
         </Card.Text>
            </Card.Body>
        </Card>
    )
})

export default Facts