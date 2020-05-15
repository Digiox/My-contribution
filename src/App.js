import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { UnknownPath } from './pages/index';
import Main from './components/Main/Main';






function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"}>
          <Main />
        </Route>
        <Route path={"/*"}>
          <UnknownPath />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
