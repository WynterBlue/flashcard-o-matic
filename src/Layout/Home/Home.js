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
        <div className="">
            <Link to={`/decks/new`} className="btn btn-secondary btn-lg mb-3">Create Deck</Link>
            
{/*/////////////////////////////////////////////////////////////////// */}
            {decks.map((deck) => <DeckViewer key ={deck.id} deck={deck}/>)}
        </div>
    )
}

export default Home