import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import MainPage from "./Components/pages/mainPage";
import CoinFlip from "./Components/pages/coinFlip";

function App() {
  return (
    <>
      <Switch>
        <Route path="/coin-flip" component={CoinFlip} />
        <Route path="/" component={MainPage} />
      </Switch>
    </>
  );
}

export default App;
