import React, { useEffect, useState } from "react";
import CardViewer from "./CardViewer";
import { readDeck } from "../utils/api";
import { Link, useRouteMatch } from "react-router-dom";



function StudyScreen(){
    const {params} = useRouteMatch()
    const [currentDeck, setCurrentDeck] = useState({})
    useEffect(() => {
        readDeck(params.deckId).then(data => setCurrentDeck(data))
    },[])
    
    if(!currentDeck.id){
        return (
            <p>Loading...</p>
        )
    }
    return (
        <div>
            <div>Bread Crumb</div>
            <div>
                <h2>Study: {currentDeck.name}</h2>
                <CardViewer deck={currentDeck}/>
            </div>
        </div>
    )
}

export default StudyScreen