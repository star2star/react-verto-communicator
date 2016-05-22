import React from 'react';
import ReactDOM, {server } from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import Home from './components/Home';
import Dial from './components/Dial';
import About from './components/About';
import Settings from './components/Settings';
import Auth from './components/Auth';
import Call from './components/Call';
import Contributors from './components/Contributors';


ReactDOM.render((
  <Router history={hashHistory}>
  <Route path="/" component={Home}>
    {/* add the routes here */}
    <Route path="/auth/login" component={Auth} />
    <Route path="/auth/logout" component={Auth} />
    <Route path="/dial" component={Dial}>
      <Route path="/dial/:nbr" component={Dial}/>
    </Route>
    <Route path="/incoming/:nbr" component={Call}/>
    <Route path="/about" component={About}/>
    <Route path="/settings" component={Settings}/>
    <Route path="/contributors" component={Contributors}/>
  </Route>
  </Router>
), document.getElementById('app'))
