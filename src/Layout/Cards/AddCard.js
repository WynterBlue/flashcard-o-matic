import React, {useEffect, useState} from "react";
import { createCard, readDeck } from "../../utils/api";
import { useRouteMatch, Link, useHistory } from "react-router-dom/";

function AddCard() {
    const history = useHistory()
    const {params} = useRouteMatch()
    const [currentDeck, setCurrentDeck] = useState({})
    let initialFormData = {
        front: '',
        back: ''
    }
    const [formData, setFormData] = useState(initialFormData)
    useEffect(() => {
        readDeck(params.deckId).then(data => setCurrentDeck(data))
    },[params.deckId])
    console.log(currentDeck)
    function handleInput(event) {
        setFormData({
            ...formData, 
            [event.target.name]: event.target.value
        })
    }
    
    
    function handleFormSubmit(event) {
        event.preventDefault()// prevents page from refreshing by default
        console.log(formData)//sanity check
        createCard(params.deckId, formData)
        setFormData({...initialFormData})//resets form to initial value
    }
    //add a toast when i have time
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
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
            </nav>
            <h3>{currentDeck.name}: Add Card</h3>
            <form name="addCard" onSubmit={handleFormSubmit}>
                <label htmlFor="front">Front</label>
                <br />
                <textarea 
                type="text" 
                name="front" 
                id="front" 
                placeholder="Front side of card"
                value={formData.front} 
                onChange={handleInput} 
                />
                <br />
                <label htmlFor="back">Back</label>
                <br />
                <textarea
                type="text" 
                name="back" 
                id="back" 
                placeholder="Back side of card"
                value={formData.back} 
                onChange={handleInput} 
                 />
                 <br />
                 <Link to={`/decks/${currentDeck.id}`} className="btn btn-secondary">Done</Link>
                 <button className="btn btn-primary" type="submit">Save</button>
            </form>
        </div>
    )
}

export default AddCard