import React, {useEffect, useState} from "react";
import { useRouteMatch, Link, useHistory } from "react-router-dom/";
import { readDeck, deleteDeck } from "../../utils/api";
import CardDisplay from "./CardDisplay";


function ViewDeck() {
    const history = useHistory()
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

    const handDelete = (id) => {
        const result = window.confirm("Delete this deck?\n \nYou will not be able to recover it.")
        if(result){
            deleteDeck(id)
            history.push("/")
        }
    }
    
    return(
        <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">{currentDeck.name}</li>
            </ol>
            </nav>
            <div className="pb-2">
                <h4>{currentDeck.name}</h4>
                <p>{currentDeck.description}</p>
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to={`/decks/${currentDeck.id}/edit`} className="btn btn-secondary">Edit</Link>
                        <Link to={`/decks/${currentDeck.id}/study`} className="btn btn-primary m-2">Study</Link>
                        <Link to={`/decks/${currentDeck.id}/cards/new`} className="btn btn-primary ">Add Cards</Link>
                    </div>
                    <div>
                        <button className="btn btn-danger" onClick={() => handDelete(currentDeck.id)}>Delete</button>
                    </div>
                </div>
            </div>
            <h2>Cards</h2>
            <div className="card">
            {currentDeck.cards.length > 0 ? currentDeck.cards.map((card) => <CardDisplay card={card}/>) : <p>There are no cards.</p>}
            </div>
        </div>
    )
}

export default ViewDeck