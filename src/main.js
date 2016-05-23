import React from 'react';
import ReactDOM, {server } from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import App from './components/app';
import Dial from './components/dial';
import Auth from './components/auth';
import Session from './components/session';
import Browser from './components/browser';



ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={Auth} />
      <Route path="/dial" component={Dial} />
      <Route path="/session" component={Session}/>
      <Route path="/bns" component={Browser}/>
    </Route>
  </Router>
), document.getElementById('app'))
