import React, {useEffect, useState} from "react";
import { createCard, readDeck } from "../../utils/api";
import { useRouteMatch, Link, useHistory } from "react-router-dom/";
import CardForm from "./CardForm";

function AddCard() {
    const {params} = useRouteMatch()
    const [currentDeck, setCurrentDeck] = useState({})
    let emptyFormData = {
        front: '',
        back: ''
    }
    
    useEffect(() => {
        readDeck(params.deckId).then(data => setCurrentDeck(data))
    },[params.deckId])

    // function handleInput(event) {
    //     setFormData({
    //         ...formData, 
    //         [event.target.name]: event.target.value
    //     })
    // }
    
    async function addCard(newCard) {
        console.log(newCard)//sanity check
        await createCard(currentDeck.id, newCard)
    }

    //add a toast when i have time
    if(!currentDeck.id){
        return (
            <p>Loading...</p>
        )
    }
    return(
        <div>
            <CardForm breadCrumb={`Add Card`} headerText={`${currentDeck.name}: Add Card`} initialFormData={emptyFormData} handleSubmit={addCard} submitButtonText={"Save"} cancelButtonText={"Done"}/>
        </div>
    )
}

export default AddCard