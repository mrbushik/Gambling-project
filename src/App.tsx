import React from 'react';
import {Route, Switch}   from "react-router";
import './App.css';
import MainPage from "./Components/pages/mainPage";

function App() {
  return (
    <>
    <Switch>
      <Route path='/' component={MainPage}/>
    </Switch>
    </>
  );
}

export default App;
