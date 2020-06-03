import React from 'react';
import './App.css';
import Header from "./components/Header"
import { Route, Switch } from "react-router-dom"
import Home from "./pages/Home"
function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>

    </>
  );
}

export default App;
