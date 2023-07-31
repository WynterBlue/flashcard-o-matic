import React, {useEffect, useState} from "react"
import { deleteDeck } from "../utils/api"
import {Route, Router, Switch, Link, useHistory} from "react-router-dom"


function DeckViewer({deck}) {
    const history = useHistory()
    const handDelete = (id) => {
        const result = window.confirm("Delete this deck?\n \nYou will not be able to recover it.")
        if(result){
            deleteDeck(id)
            history.push("/")
        }
    }

    return(
        <div className="card">
            <h4>{deck.name}</h4>
            <p>{deck.cards.length}</p>
            <p>{deck.description}</p>
            <Link exact to={`/decks/${deck.id}`} className="btn btn-primary">
                 View
            </Link>
            <Link to={`/decks/${deck.id}/study`}className="btn btn-primary">
                Study
            </Link>
            <button className="btn btn-danger" onClick={() => handDelete(deck.id)}>
                 Delete
            </button>
            
        </div>
    )
}

export default DeckViewer