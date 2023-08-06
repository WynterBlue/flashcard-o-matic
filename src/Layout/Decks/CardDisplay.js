import React from "react";
import { deleteCard } from "../../utils/api";

function CardDisplay({card}) {
    const handDelete = (id) => {
        const result = window.confirm("Delete this card?\n \nYou will not be able to recover it.")
        if(result){
            deleteCard(id)
            window.location.reload(false)
        }
    }
    return(
        <div>
            <p>{card.front}</p>
            <p>{card.back}</p>
            <div>
                <button className="btn btn-secondary">Edit</button>
                <button className="btn btn-danger" onClick={() => handDelete(card.id)}>Delete</button>
            </div>
            <hr />
        </div>
    )
}

export default CardDisplay