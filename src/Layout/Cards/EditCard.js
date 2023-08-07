import React, {useState, useEffect} from "react";
import { useRouteMatch, Link, useHistory } from "react-router-dom/";
import { readDeck, readCard, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

function EditCard() {
    const history = useHistory()
    const {params} = useRouteMatch()
    const [currentDeck, setCurrentDeck] = useState({})
    const [previousCardData, setPreviousCardData] = useState({
        front: "",
        back: "",
    });
    useEffect(() => {
        readDeck(params.deckId).then((data) => {
            setCurrentDeck(data)
        })    
    },[params.deckId])
    useEffect(() => {
        readCard(params.cardId).then((data) => {
            setPreviousCardData(data)
        })
    }, [params.cardId])

    async function editCard(card) {
        console.log(previousCardData); //sanity check
        await updateCard(card)
        history.push(`/decks/${currentDeck.id}`);
      }
  
    return(
        <div>
            <CardForm headerText={`Edit Card ${previousCardData.id}`} initialFormData={previousCardData} handleSubmit={editCard} submitButtonText={"Submit"} cancelButtonText={"Cancel"}/>
        </div>
    )
}

export default EditCard