import React, {useState, useEffect} from "react";
import { useRouteMatch, Link, useHistory } from "react-router-dom/";
import { readDeck, readCard, updateCard } from "../../utils/api";

function EditCard() {
    const history = useHistory()
    const {params} = useRouteMatch()
    const [currentDeck, setCurrentDeck] = useState({})
    const [formData, setFormData] = useState({
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
            setFormData(data)
        })
    }, [params.cardId])

    function handleInput(event) {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    }
    function handleFormSubmit(event) {
        event.preventDefault(); // prevents page from refreshing by default
        // console.log(formData); //sanity check
        updateCard(formData).then((updatedDeck) => {
          history.push(`/decks/${currentDeck.id}`);
        });
      }
  
    return(
        <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href={`/decks/${currentDeck.id}/`}>{currentDeck.name}</a></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {params.cardId}</li>
            </ol>
            </nav>
            <h3>Edit Card</h3>
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
                 <Link to={`/decks/${currentDeck.id}`} className="btn btn-secondary">Cancel</Link>
                 <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditCard