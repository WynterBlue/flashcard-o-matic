import React, {useEffect, useState} from "react"
import { listDecks } from "../../utils/api"
import {Link} from "react-router-dom"
import DeckViewer from "./DeckViewer"

function Home() {
    const [decks, setDecks] = useState([])
    useEffect(() => {
        listDecks().then(data => setDecks(data))
    }, [])

    return(
        <div>
            <h1>Home</h1>
            <Link to={`/decks/new`} className="btn btn-secondary">Create Deck</Link>
{/*/////////////////////////////////////////////////////////////////// */}
            {decks.map((deck) => <DeckViewer key ={deck.id} deck={deck}/>)}
        </div>
    )
}

export default Home