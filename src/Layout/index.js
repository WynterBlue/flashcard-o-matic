import React from "react";
import Header from "./Header";
import Home from "./Home/Home";
import CreateDeck from "./Decks/CreateDeck";
import ViewDeck from "./Decks/ViewDeck";
import StudyScreen from "./Study/StudyScreen";
import NotFound from "./NotFound";
import { Switch, Router, Link, Route } from "react-router-dom";
import EditDeck from "./Decks/EditDeck";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/*routes go here */
        
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/decks/new">
              <CreateDeck />
            </Route>
            <Route exact path="/decks/:deckId">
              <ViewDeck />
            </Route>
            <Route path="/decks/:deckId/study">
              <StudyScreen />
            </Route>
            <Route path="/decks/:deckId/edit">
              <EditDeck />
            </Route>
            <Route path="/decks/:deckId/cards/new">
              <AddCard />
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route>
              <NotFound />  
            </Route>
          </Switch>
        
        }
        {/* TODO: Implement the screen starting here */}
      </div>
    </>
  );
}

export default Layout;
