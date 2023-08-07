import React, {useEffect, useState} from "react";
import { readDeck } from "../../utils/api";
import { useRouteMatch, Link } from "react-router-dom/";

function CardForm({headerText, initialFormData, handleSubmit, submitButtonText, cancelButtonText, breadCrumb}) {
    const {params} = useRouteMatch()
    const [currentDeck, setCurrentDeck] = useState({})
    const [formData, setFormData] = useState({})
    useEffect(() => {
        setFormData(initialFormData)
    }, [initialFormData])
    useEffect(() => {
        readDeck(params.deckId).then(data => setCurrentDeck(data))
    },[params.deckId])
    console.log(formData)
    function handleInput(event) {
        setFormData({
            ...formData, 
            [event.target.name]: event.target.value
        })
        console.log(formData)
    }
    
    function handleFormSubmit(event) {
        event.preventDefault()
        console.log(formData)//sanity check
        handleSubmit(formData)
        .then(() => {
            setFormData({...initialFormData})
        })
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
                <li className="breadcrumb-item active" aria-current="page">{breadCrumb}</li>
            </ol>
            </nav>
            <h3>{headerText}</h3>
            <form name="addCard" onSubmit={handleFormSubmit}>
                <label htmlFor="front">Front</label>
                <br />
                <textarea 
                type="text" 
                name="front" 
                id="front" 
                placeholder="Front side of card"
                className="form-control"
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
                className="form-control"
                value={formData.back} 
                onChange={handleInput} 
                 />
                 <br />
                 <Link to={`/decks/${currentDeck.id}`} className="btn btn-secondary">{cancelButtonText}</Link>
                 <button className="btn btn-primary mx-2" type="submit">{submitButtonText}</button>
            </form>
        </div>
    )
}

export default CardForm