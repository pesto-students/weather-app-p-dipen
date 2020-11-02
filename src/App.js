import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './containers/Header';
import Dashboard from './containers/Dashboard';
import DetailCity from './containers/DetailCity';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="App-container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/city/:cityname" component={DetailCity} />
            <Route exact path="/citycurrentlocation" component={DetailCity} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
