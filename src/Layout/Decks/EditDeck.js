import React, { useEffect, useState } from "react";
import { useRouteMatch, Link, useHistory } from "react-router-dom/";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck() {
  const history = useHistory();
  const { params } = useRouteMatch();
  const [currentDeck, setCurrentDeck] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    readDeck(params.deckId).then((data) => {
      setCurrentDeck(data);
      setFormData(data);
    });
  }, [params.deckId]);

  function handleInput(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }
  function handleFormSubmit(event) {
    event.preventDefault(); // prevents page from refreshing by default
    // console.log(formData); //sanity check
    updateDeck(formData).then((updatedDeck) => {
      history.push(`/decks/${updatedDeck.id}`);
    });
  }
  
  if (!currentDeck.id) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${currentDeck.id}/`}>{currentDeck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <form name="createDeck" onSubmit={handleFormSubmit}>
        <h2>Edit Deck</h2>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Deck Name"
          className="form-control"
          value={formData.name}
          onChange={handleInput}
        />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          type="text"
          name="description"
          id="description"
          placeholder="Brief description of the deck"
          className="form-control"
          value={formData.description}
          onChange={handleInput}
          rows={5}
        />
        <br />
        <button
          onClick={() => history.push("/")}
          type="cancel"
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button className="btn btn-primary mx-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
