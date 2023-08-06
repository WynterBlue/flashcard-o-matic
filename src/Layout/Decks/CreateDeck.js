import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom/";
import { createDeck } from "../../utils/api";

function CreateDeck() {
    const history = useHistory()
    let initialFormData = {
        name: '',
        description: ''
    }
    const [formData, setFormData] = useState(initialFormData)
    function handleInput(event) {
        setFormData({
            ...formData, 
            [event.target.name]: event.target.value
        })
    }
    function handleFormSubmit(event) {
        event.preventDefault()// prevents page from refreshing by default
        console.log(formData)//sanity check
        createDeck(formData)
        .then((createdDeck) => {
            const newDeckId = createdDeck.id
            history.push(`/decks/${newDeckId}`)
        })
        setFormData({...initialFormData})//resets form to initial value
    }


    return(
        <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
            </ol>
            </nav>
            <form name="createDeck" onSubmit={handleFormSubmit}>
            <h2>Create Deck</h2>
            <label htmlFor="name">Name</label>
            <br />
            <input 
            type="text" 
            name ="name" 
            id="name" 
            placeholder="Deck Name"
            value={formData.name} 
            onChange={handleInput} 
            />
            <br />
            <br />
            <label htmlFor="description">Description</label>
            <br />
            <textarea 
            type="text" 
            name="description" 
            id="description" 
            placeholder="Brief description of the deck"
            value={formData.description} 
            onChange={handleInput} 
            />
            <br />
            <button onClick={() => history.push("/")} type="cancel" className="btn btn-secondary">Cancel</button>
            <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateDeck