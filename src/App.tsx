import React from 'react';
import NavBar from './components/navbar/navbarCtr';
import Footer from './components/footer/footerCtr';
import { Router } from "react-router";
import Routes from './routers/router';
import { createBrowserHistory, History } from 'history';

import './App.css';

export default class App extends React.Component<any>{

  history: History = createBrowserHistory()
  state = {
    isLogged: sessionStorage.getItem("session") ? true : false
  }

  changeStateSession = () => {
    console.log("Cambiando estado ome ", this.state.isLogged)
    this.setState({ isLogged: !this.state.isLogged }, () => {
      if (!this.state.isLogged) sessionStorage.clear();
    });
  }

  render = () => {
    return (
      <div className="App">
        <Router history={this.history}>
          <div className="header">
            <NavBar {...this} />
          </div>
          <div className="container-fluid">
            <Routes {...this} />
          </div>
          <div className="footer">
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

