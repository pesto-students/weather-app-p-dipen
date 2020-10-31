import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './containers/Header';
import Dashboard from './containers/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="App-container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
