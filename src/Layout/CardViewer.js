import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

function CardViewer({deck}) {
    const history = useHistory()
    const [index, setIndex] = useState(0)
    const cards = deck.cards
    const [count, setCount] = useState(0)
    const [next, setNext] = useState(false)
    const restartDeck = () => {
        const result = window.confirm("Restart cards?\n \nClick 'cancel' to return to the home page.")
        if(result){
            window.location.reload(false)
        }else{
            history.push("/")
        }         
    }

    const clickHandler = () => {
        setNext(false)
        setIndex(index+1)
    }
    const flipClickHandler = () => {
        setNext(true)
        setCount(count+1)
    }
// make prompt pop up after text updates
    useEffect(() => {
        if(count === cards.length){
            const timer = setTimeout(() => {
                restartDeck()
            }, 100)
            return() => clearTimeout(timer)
        }
    }, [next])
    return(
        <div className="card">
            <h4>Card {index+1} of {cards.length}</h4>
            {!next ? <p>{cards[index].front}</p> : <p>{cards[index].back}</p>}
            <div>
                <button className="btn btn-secondary" onClick={() => flipClickHandler()}>Flip</button>
                {next && <button className="btn btn-primary" onClick={() => clickHandler()}>Next</button>}
            </div>
        </div>
    )
}

export default CardViewer