import React, {useEffect, useState} from "react"
import { deleteDeck } from "../../utils/api"
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
        <div className="border rounded mb-3 p-3">
            <div className="d-flex justify-content-between">
            <h4 className="text-secondary-emphasis">{deck.name}</h4>
            <p className="text-secondary">{deck.cards.length} cards</p>
            </div>
            <p >{deck.description}</p>
            <div className="d-flex justify-content-between">
            <div className="d-flex ">
            <Link exact to={`/decks/${deck.id}`} className="btn btn-secondary ">
                 View
            </Link>
            <Link to={`/decks/${deck.id}/study`}className="btn btn-primary mx-2">
                Study
            </Link>
            </div>
            <div>
            <button className="btn btn-danger" onClick={() => handDelete(deck.id)}>
                 Delete
            </button>
            </div>
            </div>
            
        </div>
    )
}

export default DeckViewer