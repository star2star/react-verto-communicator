import React from 'react';
import ReactDOM, {server } from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import {StyleRoot} from 'radium';
import { createStore, applyMiddleware } from 'redux';
import {IntlProvider} from 'react-intl';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './containers/reducers.js';
import Messages from './js/messages';

import VertoService from './js/vertoService';
import {doSubmitLogin} from './containers/auth/action-creators';

import App from './components/app';
import Dial from './components/dial';
import Auth from './containers/auth/index.js';
import Session from './components/session';
import Browser from './components/browser';
import AppBar from './containers/appbar/index.js';


function getLanguage(){
  let sReturn = 'en-US';

  const lang = navigator.language;
  if (lang.length < 4) {
    // fix lang variable

    switch( lang.toLowerCase() ){
      case 'es':
        sReturn = 'es-ES';

        break;
      default:
        // should be English
        break;
    }
  } else {
    sReturn = lang;
  }
  // console.log('lang:', lang);
  // console.log('language being set to: ', sReturn);
  return sReturn;
}

//TODO where will this be set and managed when this is released??
// Set styling theme globally
window.theme={ value: 'default'};

const locale = getLanguage();
const messages = (new Messages(locale)).getAllMessages();

const store = createStore(reducer, applyMiddleware(thunk));

window.theStore = store;

store.dispatch(doSubmitLogin({a:1, b:2}));

ReactDOM.render((
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <StyleRoot>
        <AppBar />
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <Route path="/login" component={Auth} />
            <Route path="/dial" component={Dial} />
            <Route path="/session" component={Session}/>
            <Route path="/bns" component={Browser}/>
          </Route>
        </Router>
      </StyleRoot>
    </IntlProvider>
  </Provider>
), document.getElementById('app'));
