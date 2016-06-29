import React from 'react';
import ReactDOM, {server } from 'react-dom';
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import {StyleRoot} from 'radium';
import { createStore, applyMiddleware } from 'redux';
import { addLocaleData, IntlProvider} from 'react-intl';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import VertoService from './js/vertoService';
import reducer from './containers/reducers.js';
import Messages from './js/messages';
import App from './components/app';
import {doValidation, doLogOut, doVertoLogin, doMakeCallError, doHungUp, doCallHeld,
   doingMakeCall, doIncomingCall, doConferenceData, doReceiveChat } from './containers/main/action-creators';

function getLanguage(){
  let sReturn = 'en-US';

  const lang = navigator.language;
  if (lang.length < 4) {
    // fix lang variable

    switch( lang.toLowerCase() ){
      case 'es':
        sReturn = 'es';

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
const dialect = Messages.getDialect(locale);

const messages = (new Messages(locale)).getAllMessages();

//console.log('##########', messages);
// needed for INTL
const localeData = require('react-intl/locale-data/'+dialect);
addLocaleData(localeData);

const store = createStore(reducer, applyMiddleware(thunk));

const subId = VertoService.getInstance().subscribe((event, status, data)=>{
  console.log('>>>> Subscription: ', event, status, data)
  switch (event){
    case "loggedIn":
      store.dispatch(doVertoLogin(status, data ));
      break;
    case "logout":
      store.dispatch(doLogOut());
      break;
    case 'make-call':
      store.dispatch(doingMakeCall(status, data.number, data.callID, data.name));
      break;
    case 'makeCallError':
      store.dispatch(doMakeCallError(data));
      break;
    default:
      console.log('>>> Subscription Not Handled:', event, data);
  }
});

console.log('verto subscriptionID:', subId);

window.theStore = store;

store.dispatch(doValidation());
browserHistory.push('#/login');
//console.log('INTL: ', locale, messages);
ReactDOM.render((
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <StyleRoot>
        <App />
      </StyleRoot>
    </IntlProvider>
  </Provider>
), document.getElementById('app'));
