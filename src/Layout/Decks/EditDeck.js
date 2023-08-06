import React, {useEffect, useState} from "react";
import { useRouteMatch, Link } from "react-router-dom/";
import { readDeck } from "../../utils/api";

function EditDeck() {
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

    return(
        <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href={`/decks/${currentDeck.id}/`}>{currentDeck.name}</a></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
            </nav>
            <p>edit your deck!</p>
        </div>
    )
}

export default EditDeck