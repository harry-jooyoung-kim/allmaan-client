import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {Switch, Route} from 'react-router';
import {connect} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react'
import './App.scss';
import Login from './login/components/Login.js';
import Join from './join/components/Join.js';
import {persistor, history} from './store';
import _ from 'lodash';
import {push} from 'react-router-redux';
import store from './store';
import {
  ConnectedRouter
} from 'react-router-redux';
import {firebaseInit} from './firebase';
import Main from "./main/components/Main";
import {authActionCreators} from "./auth/authStore";
const headerLogo = require('./image/header-logo2.png');

const firebase = require('firebase');

class App extends Component {
  state = {
    menuBarShow: false
  };

  async componentDidMount() {
    const {updateAdmin} = this.props;

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        updateAdmin({user});
      } else {
        /// logout
        updateAdmin({user: null});
      }
    });
  }

  render() {

    return (
      <div className="App">
        <div className="header">
          <img className="btn-hover" src={headerLogo} onClick={e => this.props.push('/login')}/>
          <i className="icon ion-navicon-round btn-hover" onClick={e => {
            this.setState({
              menuBarShow: !this.state.menuBarShow
            });
          }}/>
          <div className={`menu-bar ${this.state.menuBarShow ? 'show' : ''}`} onClick={e => {
            this.setState({
              menuBarShow: !this.state.menuBarShow
            })
          }}>
            <div className="menu-bar-container" onClick={e => {
              e.stopPropagation();
            }}>
              Menu Bar
            </div>
          </div>
        </div>
        <ConnectedRouter history={history}>
          <div className="container">
            <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/join" component={Join}/>
              <Route path="/main" component={Main}/>
            </Switch>
          </div>
        </ConnectedRouter>
      </div>
    );
  }
}

const ConnectedApp = connect(undefined, {
  push,
  ..._.pick(authActionCreators, ['updateAdmin'])
})(App);

export default () => <Provider store={store}>
  <PersistGate persistor={persistor}>
    <ConnectedApp/>
  </PersistGate>
</Provider>
