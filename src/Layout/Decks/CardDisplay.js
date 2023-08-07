import React from "react";
import { deleteCard } from "../../utils/api";
import { Link } from "react-router-dom/";

function CardDisplay({card}) {
    const handDelete = (id) => {
        const result = window.confirm("Delete this card?\n \nYou will not be able to recover it.")
        if(result){
            deleteCard(id)
            window.location.reload(false)
        }
    }
    return(
        <div className="p-3 border">
            <div className="d-flex justify-content-between">
                <p className="mx-2 text-secondary-emphasis" style={{ width: "45%" }}>{card.front}</p>
                <p className="mx-2 text-secondary-emphasis" style={{ width: "45%" }}>{card.back}</p>
            </div>
            <div className="d-flex justify-content-end">
                <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`} className="btn btn-secondary mx-2">Edit</Link>
                <button className="btn btn-danger" onClick={() => handDelete(card.id)}>Delete</button>
            </div>
        </div>
    )
}

export default CardDisplay