import React, { useEffect, useState } from "react";
import CardViewer from "./CardViewer";
import { readDeck } from "../../utils/api";
import { useRouteMatch, useHistory, Link } from "react-router-dom";


function StudyScreen(){
    const history = useHistory()
    //get current deck
    const {params} = useRouteMatch()
    const [currentDeck, setCurrentDeck] = useState({})
    useEffect(() => {
        readDeck(params.deckId).then(data => setCurrentDeck(data))
    },[params.deckId])
    /////////////////////////
    if(!currentDeck.id){
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href={`/decks/${currentDeck.id}/`}>{currentDeck.name}</a></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
            </nav>
            <div>
                <h2>{currentDeck.name}: Study</h2>
                <CardViewer deck={currentDeck}/>
            </div>
        </div>
    )
}

export default StudyScreen